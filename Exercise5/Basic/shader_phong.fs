precision mediump float;

uniform mat4 cameraMatrixInverse;

uniform vec3 color;
uniform vec3 lightPosition;
uniform float shiny;

uniform bool ambient;
uniform bool diffuse;
uniform bool specular;


// TODO 5.2a)	Define a varying variable with
//				the same name as in the vertex
//				shader to pass the normal.

varying vec3 normal;

// TODO 5.2a)	Define a varying variable with
//				the same name as in the vertex
//				shader to pass the position.


varying vec3 world_pos_frag;

void main(void)
{

	// I_in and I_amb are white, so you can ignore them!
	vec3 k_amb = 0.3 * color;
	vec3 k_diff = 0.5 * color;
	vec3 k_spec = 0.4 * vec3(1.0, 1.0, 1.0);
	
	vec3 color_ambient, color_diffuse, color_specular;
	

	////////////////////////////////
    ////////  ambient term  ////////
    ////////////////////////////////
	color_ambient = k_amb;

	////////////////////////////////
	////////  diffuse term  ////////
	////////////////////////////////

	// TODO 5.2a)	Compute the diffuse color like shown
	//				in the lecture. Use k_diff.
	//				For the dot product, you need the normal
	//				and the vector from the fragment to the
	//				light source. Both vectors have to be
	//				normalized. Note that the varying variables
	//				normalized in the vertex shader do not have
	//				to be still normalized in the fragment shader.

	vec3 frag_light = normalize(world_pos_frag - lightPosition);

	float cos_phi = dot(normal, frag_light);

	if(cos_phi < 0.0){

		cos_phi = 0.0;

	}

	color_diffuse = k_diff*cos_phi;
	
	/////////////////////////////////
	////////  specular term  ////////
	/////////////////////////////////
	
	// TODO 5.2b)	Compute the specular color like shown
	//				in the lecture. Use k_spec and shiny.
	//				For the dot product, you need the reflection
	//				vector (computed from the normal and the vector
	//				to the light) and the view vector. To calculate
	//				the camera position, transform the camera
	//				position in camera space (easy!) to world space
	//				using the inverse camera matrix given as a 
	//				uniform.

	vec3 d = world_pos_frag-lightPosition;

	vec3 reflection = normalize(d - 2.0*dot(d, normal)*normal);

	//vec4 camera_pos_camera_space_homogeneous = vec4(0.0);
	//camera_pos_camera_space_homogeneous[3] = 1.0;


	//vec4 camera_pos_world_space_homogeneous = camera_pos_camera_space_homogeneous * cameraMatrixInverse;
	//vec3 view = normalize(vec3(camera_pos_world_space_homogeneous));///camera_pos_world_space_homogeneous[3]


	vec4 c_pos_c_s = vec4(0.0);
	c_pos_c_s[3] = 1.0;

	vec4 c_pos_w_s = cameraMatrixInverse * c_pos_c_s;

	vec3 view_v  = vec3(c_pos_w_s);

	view_v = normalize(view_v);

	//view_v = vec3(0.0);
	//view_v[0] = 1.0;

	float theta = dot(reflection, view_v);

	//if((theta<-1.0)||(theta>1.0)){

	//	theta=1.0;

	//}


	if(theta<0.0){

		theta = 0.0;

	}

	color_specular = k_spec * pow(theta, shiny);

	//if((theta>=-1.0)&&(theta<=1.0)){
	//	color_specular = k_spec * pow(theta, shiny);
	//}else{

	//	color_specular=vec3(0.0);
	//	color_specular[0] = 1.0;

	//}






	///////////////////////////////////
    ////////  resulting color  ////////
    ///////////////////////////////////
	vec3 color_result = vec3(0);
    if(ambient) color_result += color_ambient;
    if(diffuse) color_result += color_diffuse;
    if(specular) color_result += color_specular;
	gl_FragColor = vec4(color_result, 1.0);
}
