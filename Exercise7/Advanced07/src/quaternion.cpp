#include "quaternion.h"


Quaternion::Quaternion()
{
    real = 1;
    img = vec3(0);
}

// // Quaternion::Quaternion(vec3 axis, float angle)
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
    return sqrt(pow(real,2) + pow(img.x, 2) + pow(img.y, 2) + pow(img.z,2));
}

Quaternion Quaternion::normalize()
{
    // TODO 7.3 b)
    // Normalize this quaternion.

    float norm_factor = this.norm();

    return (1/norm_factor)*this;
}

Quaternion Quaternion::conjugate() const
{
    // TODO 7.3 b)
	// Return the conjugate of this quaternion.
    Quaternion result;
    result.real = this.real;
    result.img.x= - this.img.x;
    result.img.y = - this.img.y;
    result.img.z = - this.img.z;
    return result;
}

Quaternion Quaternion::inverse() const
{
    // TODO 7.3 b)
	// Return the inverse of this quaternion.
    Quaternion result;

    float norm_squared = pow(this.norm(),2);

    result = this.conjugate();

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
    return result;
}

vec3 operator*(Quaternion l, vec3 r)
{
    // TODO 7.3 c)
    // Rotate the vector 'r' with the quaternion 'l'.
    return vec3(0);
}

Quaternion operator*(Quaternion l, float r)
{
    // TODO 7.3 c)
    // Perform quaternion-scalar multiplication.
    Quaternion result;
    return result;
}

Quaternion operator+(Quaternion l, Quaternion r)
{
    // TODO 7.3 c)
	// Return the sum of the two quaternions.
    Quaternion result;
    return result;
}



Quaternion slerp(Quaternion x, Quaternion y, float t)
{
	float epsilon = 0.00001;

    // TODO 7.3 d)
    // Spherical linear interpolation (slerp) of quaternions.

    // Compute the interpolated quaternion and return it normalized.
	
    Quaternion result;
    return result;
}

std::ostream& operator<<(std::ostream &str, Quaternion r)
{
    str << "( " << r.real << "," << r.img.x << "," << r.img.y << "," << r.img.z << " )";
        return str;
}
