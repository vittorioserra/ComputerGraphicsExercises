precision mediump float;

// TODO 3.3)	Define a constant variable (uniform) to 
//              "send" the canvas size to all fragments.
uniform vec2 canvasSize;

void main(void)
{ 
	float smoothMargin = 0.01;  
	float r = 0.8;         

	// TODO 3.3)	Map the fragment's coordinate (gl_FragCoord.xy) into 
	//				the range of [-1,1]. Discard all fragments outside the circle 
	//				with the radius r. Smooth the circle's edge within 
	//				[r-smoothMargin, r] by computing an appropriate alpha value.

	highp vec2 uv = vec2(gl_FragCoord.xy);

	uv[0] = uv[0]/(50.0*canvasSize[0]) - canvasSize[0]/2.0;
	uv[1] = uv[1]/(50.0*canvasSize[1]) - canvasSize[1]/2.0;

	//gl_FragColor = vec4(abs(uv), 0.0, 1.0);//vec4(1.0, 85.0 / 255.0, 0.0, 1.0);

	if((length(uv)>(r-smoothMargin))&&(length(uv)<r)){

		float base_val = 0.0;
		float alpha_val = 0.0;
		float alpha_max = 1.0;
		float t = abs((r) - length(uv));

		alpha_val = alpha_max - t * abs(alpha_max-base_val);


		gl_FragColor = vec4(0.0, 1.0, 0.0, alpha_val);

	} if (length(uv)<(r-smoothMargin)){

		gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);//vec4(1.0, 85.0 / 255.0, 0.0, 1.0);

	}

	if(length(uv)>r){
		discard;
	}

}
