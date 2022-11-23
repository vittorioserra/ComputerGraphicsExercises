"use strict";

function webGLStart(canvas) {

    let gl = canvas.getContext("experimental-webgl");
    if (!gl) throw new Error("Could not initialise WebGL, sorry :-(\nTo enable WebGL support in your browser, go to about:config and skip the warning.\nSearch for webgl.disabled and set its value to false.");

    gl.viewport(0, 0, canvas.width, canvas.height);

    let c = [0.3, 0.2];
    let r = 0.7;
    let slices = 10;

    let vertices = [];
    let indices = [];

    // TODO 3.1)	Replace the following code so that
    //              the vertices and indices to not describe
    //              a triangle but a circle around the center
    //              c with radius r. Use triangles to describe
    //              the circle's geometry. The number of
    //              triangles is stored in the variable slices.


    //base_vertex = center ;
    c = [0,0]; // let's put this in the middle for now
    let vertex_left_x = 0.7;
    let vertex_left_y = 0.0;
    let vertex_right_x = 0.0;
    let vertex_right_y = 1.0;

    vertices.push(0);//push center point
    vertices.push(0);

    vertices.push(vertex_left_x);
    vertices.push(vertex_left_y);


    for(let i = 2; i < slices; i++){
        vertex_right_x = c[0]+r*Math.cos(2*Math.PI*i/slices);
        vertex_right_y = c[1]+r*Math.sin(2*Math.PI*i/slices);

        vertices.push(vertex_right_x);
        vertices.push(vertex_right_y);

        indices.push(0);
        indices.push(i-1);
        indices.push(i);

        console.log("Current point is x : %f , y : %f \n", vertex_right_x, vertex_right_y);

    }

    //stitch first and last vertices together
    indices.push(0);
    indices.push(1);
    indices.push(slices-1);


    let vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    let ibo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);


    let vertexShader = getShader(gl, "shader-vs");
    let fragmentShader = getShader(gl, "shader-fs");

    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
        throw new Error("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

    let attrVertexPosition = gl.getAttribLocation(shaderProgram, "vVertex");
    gl.enableVertexAttribArray(attrVertexPosition);
    gl.vertexAttribPointer(attrVertexPosition, 2, gl.FLOAT, false, 8, 0);

    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
}
