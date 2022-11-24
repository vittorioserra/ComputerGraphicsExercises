

function arrow(context, fromx, fromy, tox, toy) {
    // http://stuff.titus-c.ch/arrow.html
    let headlen = 10;   // length of head in pixels
    let angle = Math.atan2(toy - fromy, tox - fromx);
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    context.stroke();
}

///////////////////////////
////////   4.1a)   ////////
///////////////////////////

function Basic1_1(canvas) {
    
    /**
     * @param {number[]} point2D - 2D point [x,z], point to be projected
     * @returns {number} - projected x-coordinate
     */
    function OrthogonalProjection2D(point2D) {
        // TODO 4.1a)   Implement the orthogonal projection.
        //              The camera orientation is aligned with 
        //              the global coordinate system, the view 
        //              direction is the z axis. Note that point2D[0] 
        //              is the x component and point2D[1] is the z 
        //              component (Hint: have a look at the bottom left 
        //              of the output image, there you will see the x-z axis).

        //this is an orthogonal projection, so just parallel lines must be drawn here

        return point2D[0];
    }

    ////////////////////////////////////
    // show results of the projection //
    ////////////////////////////////////

    let context = canvas.getContext("2d");
    context.clearRect(0, 0, 600, 300);
    context.font = "bold 12px Georgia";
    context.textAlign = "center";

    // polygon - in world space
    let color = [0, 255, 0];
    let polygon = [[100, 400], [100, 500], [200, 500], [200, 400]];

    // draw polygon
    context.strokeStyle = 'rgb(0,0,0)';
    context.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
    context.beginPath();
    context.moveTo(polygon[polygon.length - 1][1], polygon[polygon.length - 1][0]);
    for (let i = 0; i < polygon.length; ++i) context.lineTo(polygon[i][1], polygon[i][0]);
    context.fill();
    context.stroke();

    // draw image plane
    let imagePlane = 150;
    context.fillStyle = 'rgb(0,0,0)';
    context.fillText("image plane", imagePlane, 290);
    context.strokeStyle = 'rgb(100,100,100)';
    context.beginPath();
    context.moveTo(imagePlane, 0);
    context.lineTo(imagePlane, 270);
    context.stroke();

    // project polygon onto the image plane
    let polygonProjected = new Array();
    for (let i = 0; i < polygon.length; ++i) polygonProjected.push(OrthogonalProjection2D(polygon[i]));

    // draw projected polygon
    context.strokeStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
    context.beginPath();
    context.moveTo(imagePlane, polygonProjected[polygonProjected.length - 1]);
    for (let i = 0; i < polygonProjected.length; ++i) context.lineTo(imagePlane, polygonProjected[i]);
    context.stroke();

    // draw projection lines
    context.setLineDash([3, 3]);
    context.strokeStyle = 'rgb(100,100,100)';
    context.beginPath();
    for (let i = 0; i < polygonProjected.length; ++i) {
        context.moveTo(polygon[i][1], polygon[i][0]);
        context.lineTo(imagePlane, polygonProjected[i]);
    }
    context.stroke();
    context.setLineDash([1, 0]);

    // draw axis
    arrow(context, 15, 285, 15, 255);
    arrow(context, 15, 285, 45, 285);
    context.fillStyle = 'rgb(0,0,0)';
    context.fillText("X", 5, 260);
    context.fillText("Z", 45, 297);    
}

///////////////////////////
////////   4.1b)   ////////
///////////////////////////

function Basic1_2(canvas) {

    /**
     * @param {number[]} eye - 2D point [x,z], center of camera
     * @param {number} imagePlane - z value of image plane
     * @param {number[]} point2D - 2D point [x,z], point to be projected
     * @returns {number} - projected x-coordinate
     */
    function PerspectiveProjection2D(eye, imagePlane, point2D) {
        
        // TODO 4.1b)   Implement the perspective projection assuming 
        //              the center of the camera lies in (eye[0], eye[1]).
        //              The camera orientation is aligned with the global 
        //              coordinate system. Note that eye, point2D, imagePlane 
        //              are all in world space. You first have to transform 
        //              everything to camera space. The variable 'imagePlane'
        //              gives you the z value of the image plane (You also have 
        //              to transform it to camera space coordinates.).

        //transform to camera space
        //axes are aligned, only translation


        let target_translated_x = point2D[0]-eye[0];
        let target_translated_z = point2D[1]-eye[1];

        let slope = target_translated_x/target_translated_z;

        return slope * imagePlane;

    }

    ////////////////////////////////////
    // show results of the projection //
    ////////////////////////////////////

    let context = canvas.getContext("2d");
    context.clearRect(0, 0, 600, 300);
    context.font = "bold 12px Georgia";
    context.textAlign = "center";

    // polygon - in world space
    let color = [0, 255, 0];
    let polygon = [[100, 400], [100, 500], [200, 500], [200, 400]];

    // draw polygon
    context.strokeStyle = 'rgb(0,0,0)';
    context.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
    context.beginPath();
    context.moveTo(polygon[polygon.length - 1][1], polygon[polygon.length - 1][0]);
    for (let i = 0; i < polygon.length; ++i) context.lineTo(polygon[i][1], polygon[i][0]);
    context.fill();
    context.stroke();

    // draw image plane
    let eye = [150, 10];
    let imagePlane = 150;
    context.fillStyle = 'rgb(0,0,0)';
    context.fillText("image plane", imagePlane, 290);
    context.strokeStyle = 'rgb(100,100,100)';
    context.beginPath();
    context.moveTo(imagePlane, 0);
    context.lineTo(imagePlane, 270);
    context.stroke();
    context.beginPath();
    context.arc(eye[1], eye[0], 4, 0, 2 * Math.PI);
    context.fill();

    // project polygon onto the image plane
    let polygonProjected = new Array();
    for (let i = 0; i < polygon.length; ++i) polygonProjected.push(PerspectiveProjection2D(eye, imagePlane, polygon[i]));

    // draw projected polygon
    context.strokeStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
    context.beginPath();
    context.moveTo(imagePlane, polygonProjected[polygonProjected.length - 1] + eye[0]);
    for (let i = 0; i < polygonProjected.length; ++i) context.lineTo(imagePlane, polygonProjected[i] + eye[0]);
    context.stroke();

    // draw projection lines
    context.setLineDash([3, 3]);
    context.strokeStyle = 'rgb(100,100,100)';
    context.beginPath();
    for (let i = 0; i < polygonProjected.length; ++i) {
        context.moveTo(polygon[i][1], polygon[i][0]);
        context.lineTo(imagePlane, polygonProjected[i] + eye[0]);
    }
    context.stroke();
    context.setLineDash([1, 0]);

    // draw axis
    arrow(context, eye[1], eye[0], eye[1], eye[0] - 30);
    arrow(context, eye[1], eye[0], eye[1] + 30, eye[0]);
    context.fillStyle = 'rgb(0,0,0)';
    context.fillText("X", eye[1], eye[0] - 35);
    context.fillText("Z", eye[1] + 35, eye[0]);
}


///////////////////////////
////////   4.1c)   ////////
///////////////////////////

/**
 * compute a perspective transformation
 * that perspectively maps the 2D space onto a 1D line
 * @param {number[]} out - resulting 3x3 Matrix, column-major, 
 * @param {number} fovy
 * @param {number} near 
 * @param {number} far 
 * @returns out
 */
mat3.perspective = function (out, fovy, near, far) {
    // TODO 4.1c)   Set up the projection matrix, parameterized 
    //              with the variables fovy, near and far.
    //              Use the OpenGL style to set up the matrix 
    //              (as in the lecture), i.e. the camera looks 
    //              into the negative view direction.
    //              Use column-major order!

    near = near;///300.0; /// 600.0;
    far = far;///300.0;// / 600.0;

    let r = near * Math.tan(fovy/2.0);
    let l = -r;
    let t = near * Math.tan(fovy/2.0);
    let b = -t;

    out[0] = (2.0*near)/(r-l);
    out[1] = 0.0;
    out[2] = 0.0;

    out[3] = (l+r)/(r-l);
    out[4] = -(far+near)/(far-near);
    out[5] = -1.0;

    out[6] = 0.0;
    out[7] = -(2.0*far*near)/(far-near);
    out[8] = 0.0;

    return out;
    
};


/**
 * a camera rendering a 2D scene to a 1D line
 */
class Camera {
    constructor(){
        this.eye = [150, 10];
        this.fovy = 30.0 / 180.0 * Math.PI;
        this.near = 150;
        this.far = 500;
        this.lookAtPoint = [150, 450];

        // the cameraMatrix transforms from world space to camera space
        this.cameraMatrix = mat3.create();
        // the cameraMatrixInverse transforms from camera space to world space
        this.cameraMatrixInverse = mat3.create();
        // projection matrix
        this.projectionMatrix = mat3.create();

        // setup matrices
        this.update();
    }

    lookAt(point2D) {
        this.lookAtPoint = [point2D[0], point2D[1]];
        this.update();
    }

    setEye(eye2D) {
        this.eye = [eye2D[0], eye2D[1]];
        this.update();
    }

    /**
     * setup matrices
     */
    update() {
        // note: opengl looks into the negative viewDir!
        let negViewDir = vec2.create(); // this is the gaze direction
        negViewDir[0] = this.eye[0] - this.lookAtPoint[0];
        negViewDir[1] = this.eye[1] - this.lookAtPoint[1];
        vec2.normalize(negViewDir, negViewDir);

        //console.log("neg view dir : %f, %f", negViewDir[0], negViewDir[1]);

        // TODO 4.1c)   Set up the camera matrix and the inverse camera matrix.
        //              The cameraMatrix transforms from world space to camera space.
        //              The cameraMatrixInverse transforms from camera space to world space.
        //              You can use gl-matrix.js where necessary. Use column-major order!
        //              It can be handy to compute the inverted matrix first.

        let w = vec2.create();//-negViewDir);
        w[0] = 1.0*negViewDir[0];
        w[1] = 1.0*negViewDir[1];

        //console.log("neg view dir : %f, %f", w[0], w[1]);
        //console.log("eye : %f %f, look_at_point %f, %f", this.eye[0], this.eye[1], this.lookAtPoint[0], this.lookAtPoint[1]);

        //let w = -negViewDir; // already normalized, already in the right direction
        let u = vec2.create();

        let t = vec2.create();
        /*t[0] = 1.0;
        t[1] = 0.0;*/


        t[0] = 0.0;
        t[1] = 1.0;


        //this is only perpendiculart for vec2(0,1), or similar
        //u[0] = t[1];
        //u[1] = t[0];

        u[0] = negViewDir[1];
        u[1] = -negViewDir[0];

        /*
        let alpha = Math.atan2(negViewDir[1]-w[1], negViewDir[0] - w[0]);
        let rm = mat2.create();
        rm[0] = Math.cos(alpha);
        rm[1] = Math.sin(alpha);
        rm[2] = -Math.sin(alpha);
        rm[3] = Math.cos(alpha);
        u[0] = rm[0]*t[0] + rm[2]*t[1];
        u[1] = rm[1]*t[0] + rm[3]*t[1];
        */

        let R = mat2.create();
        R[0]=u[0];
        R[1]=u[1];
        R[2]=w[0];
        R[3]=w[1];

        let M_v = mat3.create();

        let e = vec2.create();
        //vec2.normalize(e, this.eye);
        e[0] = this.eye[0];
        e[1] = this.eye[1];

        let u_te = u[0]*e[0] + u[1]*e[1];//u[0]*this.eye[0] + u[1]*this.eye[1];
        let w_te = w[0]*e[0] + w[1]*e[1];//w[0]*this.eye[0] + w[1]*this.eye[1];


        M_v[0] = R[0];
        M_v[1] = R[2];
        M_v[2] = 0.0;
        M_v[3] = R[1];
        M_v[4] = R[3];
        M_v[5] = 0.0;
        M_v[6] = -u_te;
        M_v[7] = -w_te;
        M_v[8] = 1.0;

/*
        M_v[0] = u[0];
        M_v[1] = w[0];
        M_v[2] = 0.0;
        M_v[3] = u[1];
        M_v[4] = w[1];
        M_v[5] = 0.0;
        M_v[6] = -u_te;
        M_v[7] = -w_te;
        M_v[8] = 1.0;
*/

        this.cameraMatrix = M_v;

        mat3.invert(this.cameraMatrixInverse, M_v);

        // TODO 4.1c)   Set up the projection matrix using mat3.perspective(...), 
        //              which has to be implemented!

        mat3.perspective(this.projectionMatrix, this.fovy, this.near, this.far);

    }


    matMulVec3(m, v){

        let ret = vec3.create();

        ret[0] = m[0] * v[0] + m[3] * v[1] + m[6] * v[2];
        ret[1] = m[1] * v[0] + m[4] * v[1] + m[7] * v[2];
        ret[2] = m[2] * v[0] + m[5] * v[1] + m[8] * v[2];

        return ret

    }

    /**
     * projects a point form world space coordinates to the canonical viewing volume
     * @param {number[]} point2D 
     * @returns {number[]} projected point2D
     */
    projectPoint(point2D) {

        // TODO 4.1c)   Use this.cameraMatrix to transform the point to 
        //              camera space (Use homogeneous coordinates!). Then,
        //              use this.projectionMatrix to apply the projection.
        //              Don't forget to dehomogenize the projected point 
        //              before returning it! You can use gl-matrix.js where
        //              necessary.

        let point = vec3.create()
        point[0] = point2D[0];//600.0;///600.0;
        point[1] = point2D[1];//300.0;///600.0;
        point[2] = 1.0;

        vec3.normalize(point, point);

        //console.log("Point after : %f, %f, %f", point[0], point[1], point[2]);

        let x = this.matMulVec3(this.cameraMatrix, point);
        let projected_point = this.matMulVec3(this.projectionMatrix, x);

        //console.log("Projected point : %f %f %f", projected_point[0], projected_point[1], projected_point[2]);

        //let projected_point = x;
        let ret = vec2.create();
        ret[0] = projected_point[0]/projected_point[2] ;
        ret[1] = projected_point[1]/projected_point[2] ;

        //console.log("I am the returned point,  look at me : %f %f \n Input : %f %f", ret[0], ret[1], point2D[0], point2D[1]);

        return ret;
    }

    render(context) {
        // near plane
        let p_near_0 = vec3.create();
        vec3.transformMat3(p_near_0, [this.near * Math.sin(this.fovy / 2), -this.near, 1.0], this.cameraMatrixInverse);
        let p_near_1 = vec3.create();
        vec3.transformMat3(p_near_1, [-this.near * Math.sin(this.fovy / 2), -this.near, 1.0], this.cameraMatrixInverse);
        // far plane
        let p_far_0 = vec3.create();
        vec3.transformMat3(p_far_0, [this.far * Math.sin(this.fovy / 2), -this.far, 1.0], this.cameraMatrixInverse);
        let p_far_1 = vec3.create();
        vec3.transformMat3(p_far_1, [-this.far * Math.sin(this.fovy / 2), -this.far, 1.0], this.cameraMatrixInverse);

        // render frustum
        context.fillStyle = 'rgb(0,0,0)';
        context.lineWidth = 1;
        context.fillText("near plane", p_near_1[1], p_near_1[0]+20);
        context.fillText("far plane", p_far_1[1], p_far_1[0]+20);
        context.strokeStyle = 'rgb(100,100,100)';
        context.fillStyle = 'rgb(240,240,240)';
        context.beginPath();
        context.moveTo(p_near_0[1], p_near_0[0]);
        context.lineTo(p_near_1[1], p_near_1[0]);
        context.lineTo(p_far_1[1],  p_far_1[0]);
        context.lineTo(p_far_0[1],  p_far_0[0]);
        context.lineTo(p_near_0[1], p_near_0[0]);
        context.fill();
        context.stroke();

        // render eye
        context.fillStyle = 'rgb(0,0,0)';
        context.beginPath();
        context.fillText("eye", this.eye[1], this.eye[0] + 20);
        context.arc(this.eye[1], this.eye[0], 4, 0, 2 * Math.PI);
        context.arc(this.lookAtPoint[1], this.lookAtPoint[0], 4, 0, 2 * Math.PI);
        context.fill();
    }

    enableFrustumClipping(context) {
        // near plane
        let p_near_0 = vec3.create();
        vec3.transformMat3(p_near_0, [this.near * Math.sin(this.fovy / 2), -this.near, 1.0], this.cameraMatrixInverse);
        let p_near_1 = vec3.create();
        vec3.transformMat3(p_near_1, [-this.near * Math.sin(this.fovy / 2), -this.near, 1.0], this.cameraMatrixInverse);
        // far plane
        let p_far_0 = vec3.create();
        vec3.transformMat3(p_far_0, [this.far * Math.sin(this.fovy / 2), -this.far, 1.0], this.cameraMatrixInverse);
        let p_far_1 = vec3.create();
        vec3.transformMat3(p_far_1, [-this.far * Math.sin(this.fovy / 2), -this.far, 1.0], this.cameraMatrixInverse);

        context.save();
        context.lineWidth = 1;
        context.strokeStyle = 'rgb(100,100,100)';
        context.beginPath();
        context.moveTo(p_near_0[1], p_near_0[0]);
        context.lineTo(p_near_1[1], p_near_1[0]);
        context.lineTo(p_far_1[1], p_far_1[0]);
        context.lineTo(p_far_0[1], p_far_0[0]);
        context.lineTo(p_near_0[1], p_near_0[0]);
        context.stroke();
        context.clip();
    }

    disableFrustumClipping(context) {
        context.restore();
    }

    getWorldPointOnScreen(screenCoordinate) {
        let inverse = this.cameraMatrixInverse;
        // near plane
        let p_near_0 = vec3.create();
        vec3.transformMat3(p_near_0, [this.near * Math.sin(this.fovy/2), -this.near, 1.0], inverse);
        let p_near_1 = vec3.create();
        vec3.transformMat3(p_near_1, [-this.near * Math.sin(this.fovy/2), -this.near, 1.0], inverse);

        let alpha = screenCoordinate / 2.0 + 0.5;

        return [alpha * p_near_0[0] + (1.0-alpha) * p_near_1[0],
                alpha * p_near_0[1] + (1.0-alpha) * p_near_1[1]];
    }
} //end of class Camera


function Basic1_3(canvas) {
    
    // initialize
    let camera = new Camera();
    canvas.addEventListener('mousedown', onMouseDown, false);
    showResults();

    function onMouseDown(e) {
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        if (e.ctrlKey) {
            camera.lookAt([y, x]);
        } else {
            camera.setEye([y, x]);
        }

        showResults();
    }

    function showResults(){
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, 600, 300);
        context.font = "bold 12px Georgia";
        context.textAlign = "center";

        // polygon - coordinates in world space
        let color = [0, 255, 0];
        let polygon = [[100, 400], [100, 500], [200, 500], [200, 400]];

        // draw camera
        camera.render(context);

        // draw polygon
        context.strokeStyle = 'rgb(0,0,0)';
        context.fillStyle = 'rgb(255,0,0)';
        context.beginPath();
        context.moveTo(polygon[polygon.length - 1][1], polygon[polygon.length - 1][0]);
        for (let i = 0; i < polygon.length; ++i) context.lineTo(polygon[i][1], polygon[i][0]);
        context.fill();
        context.stroke();

        camera.enableFrustumClipping(context);
        context.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
        context.beginPath();
        context.moveTo(polygon[polygon.length - 1][1], polygon[polygon.length - 1][0]);
        for (let i = 0; i < polygon.length; ++i) context.lineTo(polygon[i][1], polygon[i][0]);
        context.fill();
        context.stroke();
        camera.disableFrustumClipping(context);

        // project polygon onto the image plane
        let polygonProjected = new Array();
        for (let i = 0; i < polygon.length; ++i)
            polygonProjected.push(camera.projectPoint(polygon[i]));

        // draw projected polygon
        context.strokeStyle = 'rgb(255, 0, 0)';
        context.beginPath();
        let pointOnScreen1D = camera.getWorldPointOnScreen(polygonProjected[polygonProjected.length - 1][0]);
        context.moveTo(pointOnScreen1D[1], pointOnScreen1D[0]);
        for (let i = 0; i < polygonProjected.length; ++i) {
            pointOnScreen1D = camera.getWorldPointOnScreen(polygonProjected[i][0]);
            context.lineTo(pointOnScreen1D[1], pointOnScreen1D[0]);
        }
        context.stroke();

        camera.enableFrustumClipping(context);
        context.lineWidth = 4;
        context.strokeStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
        context.beginPath();
        pointOnScreen1D = camera.getWorldPointOnScreen(polygonProjected[polygonProjected.length - 1][0]);
        context.moveTo(pointOnScreen1D[1], pointOnScreen1D[0]);
        for (let i = 0; i < polygonProjected.length; ++i) {
            pointOnScreen1D = camera.getWorldPointOnScreen(polygonProjected[i][0]);
            context.lineTo(pointOnScreen1D[1], pointOnScreen1D[0]);
        }
        context.stroke();
        camera.disableFrustumClipping(context);
        context.lineWidth = 1;

        // draw projection lines
        context.setLineDash([3, 3]);
        context.strokeStyle = 'rgb(100,100,100)';
        context.beginPath();
        for (let i = 0; i < polygonProjected.length; ++i) {
            context.moveTo(polygon[i][1], polygon[i][0]);
            pointOnScreen1D = camera.getWorldPointOnScreen(polygonProjected[i][0]);
            context.lineTo(pointOnScreen1D[1], pointOnScreen1D[0]);

            // debug code to see the projection lines from vertex to eye
            // these lines should coincide with the projection lines ending at the image plane
            //context.moveTo(polygon[i][1], polygon[i][0]);
            //context.lineTo(camera.eye[1], camera.eye[0]);
        }
        context.stroke();
        context.setLineDash([1, 0]);

        // draw homogeneous coordinate system
        let offset = [0, 0];
        let dim = [120, 120];
        context.save();
        context.beginPath();
        context.rect(offset[1], offset[0], dim[1], dim[0]);
        context.clip();
        context.strokeStyle = 'rgb(100,100,100)';
        context.fillStyle = 'rgb(240,240,240)';
        context.beginPath();
        context.rect(offset[1], offset[0], dim[1], dim[0]);
        context.fill();
        context.stroke();
        context.beginPath();
        context.strokeStyle = 'rgb(0,0,0)';
        context.fillStyle = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
        let p = [   (-polygonProjected[polygonProjected.length - 1][0] / 2 + 0.5) * dim[0] + offset[0],
                    (polygonProjected[polygonProjected.length - 1][1] / 2 + 0.5) * dim[1] + offset[1]];
        context.moveTo(p[1], p[0]);
        for (let i = 0; i < polygonProjected.length; ++i) {
            p = [   (-polygonProjected[i][0] / 2 + 0.5) * dim[0] + offset[0],
                    (polygonProjected[i][1] / 2 + 0.5) * dim[1] + offset[1]];
            context.lineTo(p[1], p[0]);
        }
        context.fill();
        context.stroke();
        context.fillStyle = 'rgb(0,0,0)';
        context.fillText("Canonical Volume", offset[1] + dim[1] / 2, offset[0] + dim[0] - 4);
        context.restore();

        // draw axis
        arrow(context, 15, 285, 15, 255);
        arrow(context, 15, 285, 45, 285);
        context.fillStyle = 'rgb(0,0,0)';
        context.fillText("X", 5, 260);
        context.fillText("Z", 45, 297);
    }
}
