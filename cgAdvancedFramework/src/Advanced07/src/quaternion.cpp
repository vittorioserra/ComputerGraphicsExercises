#include "quaternion.h"


Quaternion::Quaternion()
{
    real = 1;
    img = vec3(0);
}

Quaternion::Quaternion(vec3 axis, float angle)
{
    // TODO 7.3 a)
    // Initialize with classic axis angle rotation as defined in the lecture.
	// Change the following two lines!

    //NOTE : Things given in this function should be normalized
	real = cos(angle/2.0);
	img = vec3(axis.x*sin(angle/2.0), axis.y*sin(angle/2.0), axis.z*sin(angle/2.0));
}



mat3 Quaternion::toMat3()
{
    // Conversion Quaternion -> mat3
    // You won't have to implement it this year :).
    mat3 Result;
    float qxx(img.x * img.x);
    float qyy(img.y * img.y);
    float qzz(img.z * img.z);
    float qxz(img.x * img.z);
    float qxy(img.x * img.y);
    float qyz(img.y * img.z);
    float qwx(real * img.x);
    float qwy(real * img.y);
    float qwz(real * img.z);

    Result[0][0] = float(1) - float(2) * (qyy +  qzz);
    Result[0][1] = float(2) * (qxy + qwz);
    Result[0][2] = float(2) * (qxz - qwy);

    Result[1][0] = float(2) * (qxy - qwz);
    Result[1][1] = float(1) - float(2) * (qxx +  qzz);
    Result[1][2] = float(2) * (qyz + qwx);

    Result[2][0] = float(2) * (qxz + qwy);
    Result[2][1] = float(2) * (qyz - qwx);
    Result[2][2] = float(1) - float(2) * (qxx +  qyy);
    return Result;
}

mat4 Quaternion::toMat4()
{
    return mat4(toMat3());
}


float Quaternion::norm() const
{
    // TODO 7.3 b)
    // Compute the L2 norm of this vector.
    return sqrt(pow(this->real,2) + pow(this->img.x, 2) + pow(this->img.y, 2) + pow(this->img.z,2));
}

Quaternion Quaternion::normalize()
{
    // TODO 7.3 b)
    // Normalize this quaternion.

    float norm_factor = 1/(this->norm());

    Quaternion ret_quat = Quaternion();

    /*
    ret_quat.real = this->real*norm_factor;
    ret_quat.img.x = this->img.x*norm_factor;
    ret_quat.img.y = this->img.y*norm_factor;
    ret_quat.img.z = this->img.z*norm_factor;
    */

    this->real = this->real*norm_factor;
    this->img.x = this->img.x*norm_factor;
    this->img.y = this->img.y*norm_factor;
    this->img.z = this->img.z*norm_factor;

    return *this;
}

Quaternion Quaternion::conjugate() const
{
    // TODO 7.3 b)
	// Return the conjugate of this quaternion.
    Quaternion result = Quaternion();
    result.real = this->real;
    result.img.x= -1.0*this->img.x;
    result.img.y = -1.0*this->img.y;
    result.img.z = -1.0*this->img.z;
    return result;
}

Quaternion Quaternion::inverse() const
{
    // TODO 7.3 b)
	// Return the inverse of this quaternion.
    Quaternion result = Quaternion();

    float norm_squared = pow(this->norm(),2);

    result = this->conjugate();

    result.real = result.real/norm_squared;
    result.img.x = result.img.x/norm_squared;
    result.img.y = result.img.y/norm_squared;
    result.img.z = result.img.z/norm_squared;

    return result;
}



float dot(Quaternion x, Quaternion y)
{
    // TODO 7.3 b)
	// Compute the dot product of x and y.
    return x.real*y.real + x.img.x*y.img.x + x.img.y*y.img.y + x.img.z*y.img.z;
}



Quaternion operator*(Quaternion l, Quaternion r)
{
    // TODO 7.3 c)
    // Perform quaternion-quaternion multiplication as defined in the lecture.
	// Hint: You can use the glm function for vector products.
    Quaternion result;

    float dot_prod = glm::dot(l.img, r.img);
    result.real= l.real*r.real - dot_prod;

    vec3 cross_img = glm::cross(l.img, r.img);

    vec3 scaled_l = r.real * l.img;//vec3(r.real*l.img.x, r.real*l.img.y, r.real*l.img.z);
    vec3 scaled_r = l.real * r.img;//vec3(l.real*r.img.x, l.real*r.img.y, l.real*r.img.z);

    result.img = cross_img + scaled_l + scaled_r;

    return result;
}

vec3 operator*(Quaternion l, vec3 r)
{
    // TODO 7.3 c)
    // Rotate the vector 'r' with the quaternion 'l'.

    /*
    float s = l.real;

    vec3 ret_vec = vec3(0);
    vec3 quat_img = l.img;

    ret_vec = 2.0 * glm::dot(r, quat_img) * quat_img +
              (s*s - glm::dot(quat_img, quat_img)) * r +
              2.0 * s * glm::cross(quat_img, r);

    //Quaternion r_q = Quaternion();
    //r_q.real = 0;
    //r_q.img = r;

    //ret_vec = (l*r_q *l.conjugate()).img;
    */

    vec3 ret_vec = vec3(0);
    mat3 quat_mat = l.toMat3();

    ret_vec = quat_mat * r;

    return ret_vec;
}

Quaternion operator*(Quaternion l, float r)
{
    // TODO 7.3 c)
    // Perform quaternion-scalar multiplication.
    Quaternion result;

    result.real = l.real * r;
    result.img.x = l.img.x * r;
    result.img.y = l.img.y * r;
    result.img.z = l.img.z * r;

    return result;
}

Quaternion operator+(Quaternion l, Quaternion r)
{
    // TODO 7.3 c)
	// Return the sum of the two quaternions.
    Quaternion result;

    result.real = l.real + r.real;
    result.img.x = l.img.x + r.img.x;
    result.img.y = l.img.y + r.img.y;
    result.img.z = l.img.z + r.img.z;

    return result;
}



Quaternion slerp(Quaternion x, Quaternion y, float t)
{
	float epsilon = 0.00001;

    // TODO 7.3 d)
    // Spherical linear interpolation (slerp) of quaternions.

    //the two quaternions should be NORMALIZED!!!

    float discriminator = dot(x, y);

    Quaternion result;

    if(discriminator <= (1-epsilon)){

        //slerp

        float Omega = acos(dot(x, y));
        float sin_Omega = sin(Omega);

        result = x*((sin((1-t)*Omega))/sin_Omega) + y*(sin(t*Omega)/sin_Omega);


    }else{

        //linear interpolation

        Quaternion diff = y + x*(-1.0);

        result = x + diff * t;


    }

    // Compute the interpolated quaternion and return it normalized.
	

    return result;
}

std::ostream& operator<<(std::ostream &str, Quaternion r)
{
    str << "( " << r.real << "," << r.img.x << "," << r.img.y << "," << r.img.z << " )";
        return str;
}
