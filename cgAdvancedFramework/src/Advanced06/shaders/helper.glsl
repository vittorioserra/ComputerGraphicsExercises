vec2 cartesianToSpherical(vec3 n)
{
    // TODO 6.4 a)
    // Convert cartesian coordinates to spherical coordinates. 
    // For computing the inverse tangent, use the two-argument
    // version of atan().

    float x = n[0];
    float y = n[1];
    float z = n[2];

    float theta = atan(z, x);
    float phi = acos(y);
    return vec2(theta,phi);
}

vec3 sphericalToCartesian(vec2 a)
{
    float theta = a.x;
    float phi = a.y;

    // TODO 6.4 a)
    // Convert spherical coordinates to cartesian coordinates.

    float x = sin(phi)*cos(theta);
    float y = cos(phi);
    float z = sin(phi)*sin(theta);

    return vec3(x, y, z);
}


vec2 sphericalToTexture(vec2 a)
{
    const float PI = 3.14159265;
    float theta = a.x; //in range [-PI,PI]
    float phi = a.y; // in range [0,PI]

    // TODO 6.4 a)
    // Compute texture coordinates from spherical coordinates.
	// Do not forget to mirror both coordinates to have the north pole at the top 
	// and France located west of Germany! ;)

	float texture_x = (theta/(2*PI) + 0.5);
	float texture_y = (phi/PI);

    texture_x = 1.0 - texture_x;
    texture_y = 1.0 - texture_y;

    return vec2(texture_x, texture_y);
}

