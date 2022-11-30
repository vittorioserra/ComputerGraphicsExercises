i
--vertex
layout(location = 0) in vec3 in_position;
layout(location = 1) in vec3 in_normal;

layout (location = 0) uniform mat4 projView;
layout (location = 1) uniform mat4 model;

out vec3 normal;
out vec3 positionWorldSpace;

void main() {
    gl_Position = projView * model * vec4(in_position, 1);

    //NOTE:
    //We use the model matrix here instead of the 'correct' normal matrix,
    //because we didn't use non-uniform scaling or shearing transformations.
    //-> The model matrix is of the form [aR | t] with 'a' being a scalar, R a rotation matrix and
    //t the translation vector.
    //
    //If we apply this to a vector (x,y,z,0) only the upper left 3x3 part of the matrix is used.
    //The inverse transpose of this part is  [aR]^-1^T = 1/a [R]^T^T = 1/a [R]
    //We can see that this is the same as the orignal model matrix, because the factor '1/a' is
    //canceled out by normalization.

    normal = normalize(vec3(model * vec4(in_normal,0)));
    positionWorldSpace = vec3(model * vec4(in_position,1));
}

--fragment


struct Light
{
    int type;
    bool enable;
    vec3 color;
    float diffuseIntensity;

    float specularIntensity;
    float shiny;

    float ambientIntensity;

    //only for spot and point light
    vec3 position;

    //only for spot and directional light
    vec3 direction;

    //only for point and spot light
    vec3 attenuation;

    //for spot light
    float angle;
    float sharpness;
};


layout (location = 2) uniform vec3 objectColor;
layout (location = 3) uniform vec3 cameraPosition;
layout (location = 4) uniform bool cellShading = false;

layout (location = 5) uniform Light directionalLight;
layout (location = 17) uniform Light spotLight;
layout (location = 29) uniform Light pointLight;


layout (location = 0) out vec3 out_color;

in vec3 normal;
in vec3 positionWorldSpace;


vec3 phong(
        Light light,
        vec3 surfaceColor,
        vec3 n, vec3 l, vec3 v)
{

    //TODO 5.4 a)
    //Compute the diffuse, specular and ambient term of the phong lighting model.
    //Use the following parameters of the light object:
    //  light.color
    //  light.diffuseIntensity
    //  light.specularIntensity
    //  light.shiny
    //  light.ambientIntensity
	//as well as the other function parameters.


    l = normalize(l);
    n = normalize(n);
    v = normalize(v);

    float cos_phi = dot(n, l);

    if(cos_phi < 0.0){

       cos_phi = 0.0;

    }

    vec3 d = -l;
    vec3 r = normalize(d - n*2.0*dot(d, n));

    float cos_theta = dot(r, v);

    if(cos_theta < 0.0){

        cos_theta = 0.0;

    }


    vec3 color_ambient  = light.color*light.ambientIntensity;
	vec3 color_diffuse  = light.color*light.diffuseIntensity*cos_phi;
    vec3 color_specular = light.color*light.specularIntensity*pow(cos_theta, light.shiny);


    //vec3 color_ambient  = vec3(0);
	//vec3 color_diffuse  = vec3(0);
    //vec3 color_specular = vec3(0);
    return color_ambient + color_diffuse + color_specular;
}


vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}


vec3 quantize_three(vec3 c){

    vec3 retvec = vec3(0);


    for(int i = 0; i < 3; i++){

        if((c[i]>=0.00)&&(c[i]<0.33)){

            retvec[i] = 0.0;

        }else if((c[i]>=0.33)&&(c[i]<0.66)){

            retvec[i] = 0.5;

        }else{

            retvec[i] = 1.0;

        }

    }

    return retvec;

}

vec3 quantize_brightness_hsv(vec3 c){

    vec3 retvec = vec3(0);

    if(c[2]<0.33){

        retvec[2] = 0.0;

    }else if((c[2]>=0.33)&&(c[2]<0.67)){

        retvec[2] = 0.5;

    }else{
        retvec[2] = 1.0;

    }

    retvec[0] = c[0];
    retvec[1] = c[1];

    return retvec;

}


void main()
{
    //Is the same for every light type!
    vec3 n = normalize(normal);
    vec3 v = normalize(cameraPosition - positionWorldSpace);

    vec3 colorDirectional = vec3(0);
    vec3 colorSpot = vec3(0);
    vec3 colorPoint = vec3(0);

    if(directionalLight.enable)
    {
        // TODO 5.4 b)
        // Use the uniforms "directionalLight" and "objectColor" to compute "colorDirectional".

        vec3 vec_to_directional = directionalLight.position - positionWorldSpace;

        colorDirectional = phong(directionalLight, objectColor, n, vec_to_directional, v); //<- change this line
    }

    if(pointLight.enable)
    {
        //TODO 5.4 c)
        //Use the uniforms "pointLight" and "objectColor" to compute "colorPoint".

        vec3 vec_to_point = pointLight.position - positionWorldSpace;

        vec3 I_0 = phong(pointLight, objectColor, n, vec_to_point, v);

        float r = length(pointLight.position - positionWorldSpace);

        float denum = pointLight.attenuation[0] + pointLight.attenuation[1] * r + pointLight.attenuation[2] * r * r ;

        colorPoint = I_0/denum; //<- change this line
    }

    if(spotLight.enable)
    {
        //TODO 5.4 d)
        //Use the uniforms "spotLight" and "objectColor" to compute "colorSpot".

        vec3 vec_to_spot = spotLight.position - positionWorldSpace;

        vec3 I_0 = phong(spotLight, objectColor, n, vec_to_spot, v);

        float r = length(spotLight.position-positionWorldSpace);

        float denum = spotLight.attenuation[0] + spotLight.attenuation[1] * r + spotLight.attenuation[2] * r * r ;

        float spot_angle = acos(dot(normalize(spotLight.direction), normalize(positionWorldSpace-spotLight.position)));

        //printf("Spot angle %f, light angle %f", spot_angle, spotLight.angle);

        /*
        if(spot_angle > spotLight.angle){

            colorSpot = vec3(0);

        }else if((spot_angle < spotLight.angle)&&(spot_angle>spotLight.angle*spotLight.sharpness)){

            colorSpot = smoothstep(spotLight.angle*spotLight.sharpness, spotLight.angle, I_0/denum);//I_0/denum; //<- change this line

        }else{

            colorSpot = I_0/denum;

        }
        */

        float scale_max = 1.0;
        float intensity_scale = 0.0;


        if(spot_angle < spotLight.angle*spotLight.sharpness){

            colorSpot = I_0/denum;

        }else if((spot_angle<spotLight.angle)&&(spot_angle>=spotLight.angle*spotLight.sharpness)){

            intensity_scale = 1 - smoothstep(spotLight.angle*spotLight.sharpness, spotLight.angle, spot_angle);
            colorSpot = intensity_scale * I_0/denum;

        }else{

            colorSpot = vec3(0);

        }

    }

    if(cellShading)
    {
        //TODO 5.4 e)


        vec3 colorDirectional_q = vec3(0);
        vec3 colorSpot_q = vec3(0);
        vec3 colorPoint_q = vec3(0);

        vec3 colorDirectional_hsv = rgb2hsv(colorDirectional);
        vec3 colorSpot_hsv = rgb2hsv(colorSpot);
        vec3 colorPoint_hsv = rgb2hsv(colorPoint);

//         colorDirectional_q = quantize_three(colorDirectional_hsv);
//         colorSpot_q = quantize_three(colorSpot_hsv);
//         colorPoint_q = quantize_three(colorPoint_hsv);

        vec3 colorDirectional_q_hsv = quantize_brightness_hsv(colorDirectional_hsv);
        vec3 colorSpot_q_hsv = quantize_brightness_hsv(colorSpot_hsv);
        vec3 colorPoint_q_hsv = quantize_brightness_hsv(colorPoint_hsv);

        colorDirectional_q = hsv2rgb(colorDirectional_q_hsv);
        colorSpot_q = hsv2rgb(colorSpot_q_hsv);
        colorPoint_q = hsv2rgb(colorPoint_q_hsv);


        out_color = colorDirectional_q + colorSpot_q + colorPoint_q;


    }else{
        out_color = colorDirectional + colorSpot + colorPoint;
    }
}
