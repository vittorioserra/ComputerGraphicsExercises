
/////////////////////////
////////   4.2   ////////
/////////////////////////

/**
 * compute a perspective transformation
 * that perspectively maps the 3D space onto a 2D plane
 * @param {number[]} out - resulting 4x4 Matrix, column-major, 
 * @param {number} fovy
 * @param {number} near 
 * @param {number} far 
 * @returns out
 */
mat4.perspective = function (out, fovy, near, far) {
    // TODO 4.2     Implement the creation of the projection
    //              matrix for 3D. Orientate yourselves by the 2D case
    //              implemented in Basic1.js.

    // out[0] = ?
    // out[1] = ?
    // ...

    let r = near * Math.tan(fovy/2.0);
    let l = -r;
    let t = near * Math.tan(fovy/2.0);
    let b = -t;

    out[0] = (2.0*near)/(r-l);
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;

    out[4] = 0.0;
    out[5] = (2.0*near)/(t-b);
    out[6] = 0.0;
    out[7] = 0.0;

    out[8] = 0;//(l+r)/(r-l);
    out[9] = 0;//(b+t)/(t-b);
    out[10] = -1.0*(far+near)/(far-near);
    out[11] = -1.0;

    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = -1.0*(2*far*near)/(far-near);
    out[15] = 0.0;


    return out;


};


/**
 * a camera rendering a 3D scene to a 2D plane
 */
class Camera3D {
    constructor(){
        this.eye = [10, 10, 10];
        this.fovy = 30.0 / 180.0 * Math.PI;
        this.near = 5;
        this.far = 30;
        this.lookAtPoint = [0, 0, 0];
        this.upVector = [0, 1, 0];

        // the cameraMatrix transforms from world space to camera space
        this.cameraMatrix = mat4.create();
        // projection matrix
        this.projectionMatrix = mat4.create();

        // setup matrices
        this.update();
    }

    setMatrices(cameraMatrix, projectionMatrix) {
        this.cameraMatrix = cameraMatrix;
        this.projectionMatrix = projectionMatrix;
    }

    lookAt(point3D) {
        this.lookAtPoint = [point3D[0], point3D[1], point3D[2]];
        this.update();
    }

    setEye(eye3D) {
        this.eye[0] = [eye3D[0], eye3D[1], eye3D[2]];
        this.update();
    }

    setFar(far) {
        this.far = far;
        this.update();
    }

    setFovy(fovy) {
        this.fovy = fovy;
        this.update();
    }

    move(dir) {
        if (dir == 0) {
            vec3.sub(this.eye, this.eye, this.w);
        } else if (dir == 1) {
            let origin = vec3.fromValues(0, 0, 0);
            vec3.rotateY(this.eye, this.eye, origin, -5 * Math.PI / 180);
        } else if (dir == 2) {
            vec3.add(this.eye, this.eye, this.w);
        } else if (dir == 3) {
            let origin = vec3.fromValues(0, 0, 0);
            vec3.rotateY(this.eye, this.eye, origin, 5 * Math.PI / 180);
        } 
        this.update();
    }

    matMulVec3(m, v){

        let ret = vec3.create();

        ret[0] = m[0] * v[0] + m[3] * v[1] + m[6] * v[2];
        ret[1] = m[1] * v[0] + m[4] * v[1] + m[7] * v[2];
        ret[2] = m[2] * v[0] + m[5] * v[1] + m[8] * v[2];

        return ret

    }

    /**
     * setup matrices
     */
    update() {
        // TODO 4.2     Implement the creation of the camera matrix
        //              (this.cameraMatrix), also setting the three 
        //              vectors this.u, this.v and this.w which form
        //              the camera coordinate system. Use the  
        //              notation from the lecture.
        //              Again, be careful to use column-major notation.

        // this.w = ?
        // this.u = ?
        // this.v = ? 
        let negViewDir = vec3.create(); // gaze direction vector g
        negViewDir[0] = this.eye[0] - this.lookAtPoint[0];
        negViewDir[1] = this.eye[1] - this.lookAtPoint[1];
        negViewDir[2] = this.eye[2] - this.lookAtPoint[2];
        vec3.normalize(negViewDir, negViewDir);

        this.w = vec3.create();

        this.w[0] = negViewDir[0];
        this.w[1] = negViewDir[1];
        this.w[2] = negViewDir[2];

        let t = vec3.create();
        //t = this.upVector;
        t[0] = this.upVector[0];
        t[1] = this.upVector[1];
        t[2] = this.upVector[2];

        vec3.normalize(t, t);

        this.u = vec3.create();
        this.v = vec3.create();

        vec3.cross(this.u, t, this.w);
        vec3.normalize(this.u, this.u);

        vec3.cross(this.v, this.w, this.u)


        let R = mat3.create();


        R[0] = this.u[0];
        R[1] = this.u[1];
        R[2] = this.u[2];


        R[3] = this.v[0];
        R[4] = this.v[1];
        R[5] = this.v[2];


        R[6] = this.w[0];
        R[7] = this.w[1];
        R[8] = this.w[2];

/*
        R[0] = 1;
        R[1] = 0;
        R[2] = 0;


        R[3] = 0;
        R[4] = 1;
        R[5] = 0;


        R[6] = 0;
        R[7] = 0;
        R[8] = 1;
*/


        let e = vec3.create()
        e[0] = this.eye[0];
        e[1] = this.eye[1];
        e[2] = this.eye[2];

        let R_t = mat3.create();
        mat3.transpose(R_t , R);

        let M_v = mat4.create();

        M_v[0] = R[0];
        M_v[1] = R[3];
        M_v[2] = R[6];
        M_v[3] = 0.0;

        M_v[4] = R[1];
        M_v[5] = R[4];
        M_v[6] = R[7];
        M_v[7] = 0.0;

        M_v[8] = R[2];
        M_v[9] = R[5];
        M_v[10] = R[8];
        M_v[11] = 0.0;

        //let Rt_e = vec3.create();
        //vec3.transformMat3(Rt_e, e, R_t);

        let Rt_e = this.matMulVec3(R_t, e);

        M_v[12] = 0.0;
        M_v[13] = 0.0;
        M_v[14] = 0.0;
        M_v[15] = 1.0;
        // this.cameraMatrix = ?

        let first_matrix = mat4.fromValues(this.u[0], this.v[0], this.w[0], 0,
                                           this.u[1], this.v[1], this.w[1], 0,
                                           this.u[2], this.v[2], this.w[2], 0,
                                           0,0,0, 1);

        let second_matrix  = mat4.fromValues(1,0,0,0,
                                             0,1,0,0,
                                             0,0,1,0,
                                             -e[0], -e[1], -e[2], 1);

        mat4.multiply(this.cameraMatrix, first_matrix, second_matrix);

        /*
        this.cameraMatrix[0] = M_v[0];
        this.cameraMatrix[1] = M_v[1];
        this.cameraMatrix[2] = M_v[2];
        this.cameraMatrix[3] = M_v[3];
        this.cameraMatrix[4] = M_v[4];
        this.cameraMatrix[5] = M_v[5];
        this.cameraMatrix[6] = M_v[6];
        this.cameraMatrix[7] = M_v[7];
        this.cameraMatrix[8] = M_v[8];
        this.cameraMatrix[9] = M_v[9];
        this.cameraMatrix[10] = M_v[10];
        this.cameraMatrix[11] = M_v[11];
        this.cameraMatrix[12] = M_v[12];
        this.cameraMatrix[13] = M_v[13];
        this.cameraMatrix[14] = M_v[14];
        this.cameraMatrix[15] = M_v[15];
        */

        this.projectionMatrix = mat4.create();

        // use (and implement) mat4.perspective to set up the projection matrix
        mat4.perspective(this.projectionMatrix, this.fovy, this.near, this.far);
    }
} // end of Camera3D




function Basic2(canvas) {

    // shader programs
    let shaderProgramCube;
    let shaderProgramLine;

    // clear color
    let clearColor = [0.5, 0.5, 0.5];

    // gl buffer data
    let vboCube;
    let iboCube;
    let iboNCube;

    // cameras
    let camera = new Camera3D();
    let cameraDebug = new Camera3D();
    
    let gl; // webGL context
    let time = 0; // time counter

    //////////////////////////////////
    //////////   setup webGl   ///////
    //////////////////////////////////
    // reset the slider
    let slider = document.getElementById('slider_fovy');
    slider.addEventListener("change", onChangeFovySlider, false);
    
    slider.value = 30;

    // add event listener
    document.addEventListener('keypress', onKeyPress, false);

    // initialize webGL canvas
    gl = canvas.getContext("experimental-webgl");
    if (!gl) throw new Error("Could not initialise WebGL, sorry :-(");

    // init scene and shaders
    initScene();

    // set clear color and enable depth test
    gl.clearColor(clearColor[0], clearColor[1], clearColor[2], 1.0);
    gl.enable(gl.DEPTH_TEST);

    // start render loop
    renderLoop();

    /////////////////////////////////////
    //////////   event listener   ///////
    /////////////////////////////////////

    function onChangeFovySlider() {
        camera.setFovy(this.value * Math.PI / 180.0);
    }

    function onKeyPress(e) {
        if (e.charCode == 119) { // W
            camera.move(0);
        } else if (e.charCode == 97) { // A
            camera.move(1);
        } else if (e.charCode == 115) { // S
            camera.move(2);
        } else if (e.charCode == 100) { // D
            camera.move(3);
        } 
    }

    /////////////////////////////
    ///////   Render Loop   /////
    /////////////////////////////
    
    function renderLoop() {

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.clear(gl.DEPTH_BUFFER_BIT);

        // draw scene from camera on left side
        gl.viewport(0, 0, gl.drawingBufferWidth / 2, gl.drawingBufferHeight);
        drawScene(false);

        // draw scene from debug view on right side
        gl.viewport(gl.drawingBufferWidth / 2, 0, gl.drawingBufferWidth / 2, gl.drawingBufferHeight);
        drawScene(true);

        // wait
        window.setTimeout(renderLoop, 1000 / 60);

        // update time
        time += 1000 / 60;
    }

    //////////////////////////////////
    ////////  shader loading  ////////
    //////////////////////////////////

    // shader from java script block
    function getShader(id) {
        let shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }

        let str = "";
        let k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        let shader;
        if (shaderScript.type == "--fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        }
        else if (shaderScript.type == "--vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        }
        else return null;

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw new Error(gl.getShaderInfoLog(shader));
        }

        return shader;
    }

    function shaderProgram(vertexShaderSourceID, fragmentShaderSourceID) {
        let vertexShader = getShader(vertexShaderSourceID);
        let fragmentShader = getShader(fragmentShaderSourceID);

        // create shader program
        let shaderProgram = gl.createProgram();

        // attach shaders
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);

        // link program
        gl.linkProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
            throw new Error("Could not initialise shaders");
        }        
        return shaderProgram;
    }

    //////////////////////////////
    ////////  init scene  ////////
    //////////////////////////////
    function initScene() {

        //////////////////////////////////////
        ////////  setup geometry - cube //////
        //////////////////////////////////////

        // buffer on the cpu
        let v = [
            // front
            -1.0, -1.0,  1.0,
            1.0, -1.0,  1.0,
            1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,
            // back
            -1.0, -1.0, -1.0,
            1.0, -1.0, -1.0,
            1.0,  1.0, -1.0,
            -1.0,  1.0, -1.0,
        ];

        let i = [
            // front
            0, 1, 2,
            2, 3, 0,
            // top
            1, 5, 6,
            6, 2, 1,
            // back
            7, 6, 5,
            5, 4, 7,
            // bottom
            4, 0, 3,
            3, 7, 4,
            // left
            4, 5, 1,
            1, 0, 4,
            // right
            3, 2, 6,
            6, 7, 3,
        ];

        // create vertex buffer on the gpu
        vboCube = gl.createBuffer();
        // bind buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, vboCube);
        // copy data from cpu to gpu memory
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(v), gl.STATIC_DRAW);

        // create index buffer on the gpu
        iboCube = gl.createBuffer();
        // bind buffer
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboCube);
        // copy data from cpu to gpu memory
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(i), gl.STATIC_DRAW);

        iboNCube = i.length;

        //////////////////////////////////////
        ////////  setup geometry - line //////
        //////////////////////////////////////

        // buffer on the cpu
        v = [   0, 0, 0,
                0, 0, 1];
        i = [0, 1];


        // create vertex buffer on the gpu
        vboLine = gl.createBuffer();
        // bind buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, vboLine);
        // copy data from cpu to gpu memory
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(v), gl.STATIC_DRAW);

        // create index buffer on the gpu
        iboLine = gl.createBuffer();
        // bind buffer
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLine);
        // copy data from cpu to gpu memory
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(i), gl.STATIC_DRAW);

        iboNLine = i.length;


        ///////////////////////////////
        ////////  setup shaders  //////
        ///////////////////////////////
        shaderProgramCube = shaderProgram("shader-vs-cube", "shader-fs-cube");
        gl.useProgram(shaderProgramCube);
        attrVertex = gl.getAttribLocation(shaderProgramCube, "vVertex");
        gl.enableVertexAttribArray(attrVertex);

        shaderProgramLine = shaderProgram("shader-vs-line", "shader-fs-line");
        gl.useProgram(shaderProgramLine);
        attrVertex = gl.getAttribLocation(shaderProgramLine, "vVertex");
        gl.enableVertexAttribArray(attrVertex);

        ////////////////////////////////////
        ////////  setup debug camera  //////
        ////////////////////////////////////

        let debugCameraMatrix = mat4.fromValues(0.2873478829860687, -0.1802094429731369, 0.9407208561897278, 0,
                                                0, 0.9821414351463318, 0.18814417719841003, 0,
                                                -0.9578263163566589, -0.05406283214688301, 0.28221625089645386, 0,
                                                5.960464477539062e-7, 2.7939677238464355e-7, -53.15073013305664, 1);
        let debugProjectionMatrix = mat4.fromValues(3.732, 0, 0, 0, 0, 3.732, 0, 0, 0, 0, -1.01, -1, 0, 0, -10.05, 0);
        cameraDebug.setMatrices(debugCameraMatrix, debugProjectionMatrix);
    }

    //////////////////////////////
    ////////  draw scene  ////////
    //////////////////////////////

    function drawScene(debug) {

        let modelMatrixCube = mat4.create();

        let cam = debug ? cameraDebug : camera;

        // draw the cube
        drawCube(modelMatrixCube, cam);

        if (debug) {
            // draw camera frustum

            let halfSideFar = camera.far * Math.tan(camera.fovy);
            let halfSideNear = camera.near * Math.tan(camera.fovy);
            let from = vec3.fromValues(camera.eye[0], camera.eye[1], camera.eye[2]);

            for (let i = 0; i < 4; i++) {
                let from_corner = [-1, -1];
                let to_corner = [-1, 1];
                if (i == 1) {
                    from_corner = [-1, 1];
                    to_corner = [1, 1];
                } else if (i == 2) {
                    from_corner = [1, 1];
                    to_corner = [1, -1];
                } else if(i == 3) {
                    from_corner = [1, -1];
                    to_corner = [-1, -1];
                }
                let modelMatrix;
                
                // draw near plane
                let fromNear = vec3.fromValues(camera.eye[0] - camera.w[0] * camera.near + from_corner[0] * camera.u[0] * halfSideNear + from_corner[1] * camera.v[0] * halfSideNear,
                                            camera.eye[1] - camera.w[1] * camera.near + from_corner[0] * camera.u[1] * halfSideNear + from_corner[1] * camera.v[1] * halfSideNear,
                                            camera.eye[2] - camera.w[2] * camera.near + from_corner[0] * camera.u[2] * halfSideNear + from_corner[1] * camera.v[2] * halfSideNear);
                let toNear = vec3.fromValues(camera.eye[0] - camera.w[0] * camera.near + to_corner[0] * camera.u[0] * halfSideNear + to_corner[1] * camera.v[0] * halfSideNear,
                                            camera.eye[1] - camera.w[1] * camera.near + to_corner[0] * camera.u[1] * halfSideNear + to_corner[1] * camera.v[1] * halfSideNear,
                                            camera.eye[2] - camera.w[2] * camera.near + to_corner[0] * camera.u[2] * halfSideNear + to_corner[1] * camera.v[2] * halfSideNear);
                modelMatrix = mat4.fromValues(      0, 0, 0, 0,
                                                        0, 0, 0, 0,
                                                        toNear[0] - fromNear[0], toNear[1] - fromNear[1], toNear[2] - fromNear[2], 0,
                                                        fromNear[0], fromNear[1], fromNear[2], 1);
                drawLine(modelMatrix);

                // draw far plane
                let fromFar = vec3.fromValues(camera.eye[0] - camera.w[0] * camera.far + from_corner[0] * camera.u[0] * halfSideFar + from_corner[1] * camera.v[0] * halfSideFar,
                                            camera.eye[1] - camera.w[1] * camera.far + from_corner[0] * camera.u[1] * halfSideFar + from_corner[1] * camera.v[1] * halfSideFar,
                                            camera.eye[2] - camera.w[2] * camera.far + from_corner[0] * camera.u[2] * halfSideFar + from_corner[1] * camera.v[2] * halfSideFar);
                let toFar = vec3.fromValues(camera.eye[0] - camera.w[0] * camera.far + to_corner[0] * camera.u[0] * halfSideFar + to_corner[1] * camera.v[0] * halfSideFar,
                                            camera.eye[1] - camera.w[1] * camera.far + to_corner[0] * camera.u[1] * halfSideFar + to_corner[1] * camera.v[1] * halfSideFar,
                                            camera.eye[2] - camera.w[2] * camera.far + to_corner[0] * camera.u[2] * halfSideFar + to_corner[1] * camera.v[2] * halfSideFar);
                modelMatrix = mat4.fromValues(0, 0, 0, 0,
                                                        0, 0, 0, 0,
                                                        toFar[0] - fromFar[0], toFar[1] - fromFar[1], toFar[2] - fromFar[2], 0,
                                                        fromFar[0], fromFar[1], fromFar[2], 1);
                drawLine(modelMatrix);

                // draw sides
                modelMatrix = mat4.fromValues(0, 0, 0, 0,
                                                        0, 0, 0, 0,
                                                        toFar[0] - from[0], toFar[1] - from[1], toFar[2] - from[2], 0,
                                                        from[0], from[1], from[2], 1);
                drawLine(modelMatrix);
            }
        }
    }

    function drawCube(modelMatrix, cam) {
        gl.useProgram(shaderProgramCube);
        // set shader uniforms
        let uniformLocModelMatrix = gl.getUniformLocation(shaderProgramCube, "modelMatrix");
        gl.uniformMatrix4fv(uniformLocModelMatrix, false, modelMatrix);
        let uniformLocCameraMatrix = gl.getUniformLocation(shaderProgramCube, "cameraMatrix");
        gl.uniformMatrix4fv(uniformLocCameraMatrix, false, cam.cameraMatrix);
        let uniformLocProjectionMatrix = gl.getUniformLocation(shaderProgramCube, "projectionMatrix");
        gl.uniformMatrix4fv(uniformLocProjectionMatrix, false, cam.projectionMatrix);
        // bind buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, vboCube);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboCube);
        let attrVertex = gl.getAttribLocation(shaderProgramCube, "vVertex");
        gl.vertexAttribPointer(attrVertex, 3, gl.FLOAT, false, 12, 0);
        // draw
        gl.drawElements(gl.TRIANGLES, iboNCube, gl.UNSIGNED_SHORT, 0);
    }

    function drawLine(modelMatrix) {
        gl.useProgram(shaderProgramLine);
        // set shader uniforms
        let uniformLocModelMatrix = gl.getUniformLocation(shaderProgramLine, "modelMatrix");
        gl.uniformMatrix4fv(uniformLocModelMatrix, false, modelMatrix);
        let uniformLocCameraMatrix = gl.getUniformLocation(shaderProgramLine, "cameraMatrix");
        gl.uniformMatrix4fv(uniformLocCameraMatrix, false, cameraDebug.cameraMatrix);
        let uniformLocProjectionMatrix = gl.getUniformLocation(shaderProgramLine, "projectionMatrix");
        gl.uniformMatrix4fv(uniformLocProjectionMatrix, false, cameraDebug.projectionMatrix);
        // bind buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, vboLine);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLine);
        let attrVertex = gl.getAttribLocation(shaderProgramLine, "vVertex");
        gl.vertexAttribPointer(attrVertex, 3, gl.FLOAT, false, 12, 0);
        // draw
        gl.drawElements(gl.LINES, iboNLine, gl.UNSIGNED_SHORT, 0);
    }
}
