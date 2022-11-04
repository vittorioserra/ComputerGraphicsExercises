"use strict"

/////////////////////////////////////////////
/////////  Complex Number Helpers  //////////
/////////////////////////////////////////////
function ComplexNumber(re, im) {
    this.re = re;
    this.im = im;
}

function ComplexNumberFromCoords(x, y, canvasID) {
    let canvas = document.getElementById(canvasID);
    this.re = (x / (1.0 * canvas.width) - 0.5);
    this.im = (y / (1.0 * canvas.height) - 0.5);
    if (canvasID == 'julia_canvas') {
        this.re *= 3;
        this.im *= 3;
    } else {
        this.re = this.re * 3 * Math.pow(2, zoom) + center.re;
        this.im = this.im * 2 * Math.pow(2, zoom) + center.im;
    }
}

function mult(x, y) {
    let re = (x.re * y.re - x.im * y.im);
    let im = (x.re * y.im + x.im * y.re);
    return new ComplexNumber(re, im);
}

function add(x, y) {
    let re = (x.re + y.re);
    let im = (x.im + y.im);
    return new ComplexNumber(re, im);
}

function sub(x, y) {
    let re = (x.re - y.re);
    let im = (x.im - y.im);
    return new ComplexNumber(re, im);
}

function abs(x) {
    return Math.sqrt(x.re * x.re + x.im * x.im);
}


/////////////////////////////////
/////////  Magic Math  //////////
/////////////////////////////////
function f_c(z, c) {
    // TODO 1.4a):      Compute the result of function f_c for a given z and
    //                  a given c. Use the helper functions.

    let mult_res = mult(z, z);

    let add_res = add(mult_res, c);

    return add_res;
}

function countIterations(start_z, c, max_iter) {
    // TODO 1.4a):      Count iterations needed for the sequence to diverge.
    //                  z is declared diverged as soon as its absolute value
    //                  exceeds 2. If the sequence does not diverge during
    //                  the first max_iter iterations, return max_iter. Use
    //                  function f_c().
    let ctr = 0;
    let z_new = start_z;
    let z_old = start_z;

    while((abs(z_old) < 2) && (ctr < max_iter)){

        z_new = f_c(z_old, c);

        z_old = z_new;
        ctr += 1;

    }

    // TODO 1.4b):      Change the return value of this function to avoid
    //                  banding. 

    let mu = ctr*1.0 + 1.0 - Math.log(Math.log(abs(z_new))/Math.log(2.0));


    if(ctr == max_iter){
        return max_iter;
    }else{
        return mu;
    }

}


/////////////////////////////
/////////  Colors  //////////
/////////////////////////////
function getColorForIter(iter) {

    // find out which radio button is checked, i.e. which color scheme is picked
    let colorscheme;
    let radios = document.getElementsByName('colors');
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            colorscheme = radios[i].value;
            break;
        }
    }

    // return color according to chosen color scheme
    let color = [128, 128, 128];
    
    if (colorscheme == "black & white") {
        // TODO 1.4a):      Return the correct color for the iteration count
        //                  stored in iter. Pixels corresponding to complex
        //                  numbers for which the sequence diverges should be
        //                  shaded white. Use the global variable max_iter.

        if(iter >= max_iter*1.0){ // iter

            color = [0,0,0];

        }else{

            color = [255,255,255];

        }

    } else if (colorscheme == "greyscale") {
        // TODO 1.4b):      Choose a greyscale color according to the given
        //                  iteration count in relation to the maximum
        //                  iteration count. The more iterations are needed
        //                  for divergence, the darker the color should be.
        //                  Be aware of integer division!
        let black_c = 0;
        let white_c = 255;

        let pos_cmap = Math.floor((white_c - black_c)*iter / max_iter);

        let c_var = white_c - pos_cmap;

        color = [c_var, c_var, c_var];


    } else if (colorscheme == "underwater") {
        // TODO 1.4b):      Choose a color between blue and green according
        //                  to the given iteration count in relation to the
        //                  maximum iteration count. The more iterations are
        //                  needed for divergence, the more green and less
        //                  blue the color should be.
        let min_c = 0;
        let max_c = 255;

        let pos_cmap = Math.floor((max_c - min_c)*iter / max_iter);

        let c_var_blue = max_c - pos_cmap;
        let c_var_green = min_c + pos_cmap;

        if(iter >= 1.0*max_iter){
            color = [0,0,0];
        }else{
            color = [0, c_var_green, c_var_blue];
        }

    } else { // rainbow
        // TODO 1.4b):      Choose a rainbow color according to the given
        //                  iteration count in relation to the maximum
        //                  iteration count. Colors should change from cyan
        //                  (for very few needed iterations) over blue, violet, pink,
        //                  red, yellow and green back to cyan (for lots of
        //                  needed iterations). Use the HSV model and convert
        //                  HSV to RGB colors using function hsv2rgb.

        //all in hsv color mode;

        let max_hue_deg = 360.0;
        let min_hue = 0.0;

        //all is normed to unitary value
        let saturation = 1.0;

        let value = 1.0;

        if(iter >= max_iter){
            value = 0.0;
        }

        let hue_pos = (iter*1.0)/(max_iter*1.0) * max_hue_deg;
        let hue_pos_rad = hue_pos*Math.pi/180.0;

        let hue_offset = 180.0; // cyian
        let hue_pos_offset = hue_pos + hue_offset;

        while(hue_pos_offset >= 360.0){
            hue_pos_offset = hue_pos_offset - 360.0;
        }

        //this should never happend, just added in case we decide to invert the color map
        while(hue_pos_offset < 0.0){
            hue_pos_offset = hue_pos_offset + 360.0;
        }

        let hsv_c_normed = [hue_pos_offset, saturation, value];

        color = hsv2rgb(hsv_c_normed);

    }
    return color;
}


function hsv2rgb(hsv) {
    let h = hsv[0];
    let s = hsv[1];
    let v = hsv[2];


    // TODO 1.4b):      Replace the following line by code performing the
    //                  HSV to RGB convertion known from the lecture.

    let c = v * s;
    let hue_normed = 1.0 - Math.abs(((h*1.0)/60.0)%2.0 -1.0);
    let x = c * hue_normed;
    let m = v - c;

    let r_prime = 0;
    let g_prime = 0;
    let b_prime = 0;

    let h_sextant = h/60.0;

    if((h_sextant >= 0.0) && (h_sextant < 1.0)){
        r_prime = c;
        g_prime = x;
        b_prime = 0;
    }else if((h_sextant >= 1.0)&&(h_sextant < 2.0)){
        r_prime = x;
        g_prime = c;
        b_prime = 0;
    }else if((h_sextant >= 2.0)&&(h_sextant < 3.0)){
        r_prime = 0;
        g_prime = c;
        b_prime = x;
    }else if((h_sextant >= 3.0)&&(h_sextant < 4.0)){
        r_prime = 0;
        g_prime = x;
        b_prime = c;
    }else if((h_sextant >= 4.0)&&(h_sextant < 5.0)){
        r_prime = x;
        g_prime = 0;
        b_prime = c;
    }else if((h_sextant >= 5.0)&&(h_sextant < 6.0)){
        r_prime = c;
        g_prime = 0;
        b_prime = x;
    }

    let r_rgb = (r_prime + m)*255;
    let g_rgb = (g_prime + m)*255;
    let b_rgb = (b_prime + m)*255;

    let rgb = [r_rgb, g_rgb, b_rgb];

    return rgb;
}


/////////////////////////////////////
/////////  Canvas Fillers  //////////
/////////////////////////////////////
function mandelbrotSet(image) {
    for (let i = 0; i < 4 * image.width * image.height; i += 4) {
        let pixel = i / 4;
        let x = pixel % image.width;
        let y = image.height - pixel / image.width;
        let c = new ComplexNumberFromCoords(x, y, 'mandelbrot_canvas');

        // TODO 1.4a):      Replace the following line by creation of the
        //                  Mandelbrot set. Use functions countIterations() 
        //                  and getColorForIter().

        let z = new ComplexNumberFromCoords(x, y,'mandelbrot_canvas');

        let iter_n = countIterations(z, c, max_iter);

        let rgb = getColorForIter(iter_n);

        image.data[i] = rgb[0];
        image.data[i + 1] = rgb[1];
        image.data[i + 2] = rgb[2];
        image.data[i + 3] = 255;
    }
}

function juliaSet(image) {
    for (let i = 0; i < 4 * image.width * image.height; i += 4) {
        let pixel = i / 4;
        let x = pixel % image.width;
        let y = image.height - pixel / image.width;

        // TODO 1.4d):      Replace the following line by creation of the
        //                  Julia set for c = juliaC (global variable). Use
        //                  functions ComplexNumberFromCoords(),
        //                  countIterations() and getColorForIter().

        let z = new ComplexNumberFromCoords(x, y, "julia_canvas");
        let c = juliaC;

        let iter_n = countIterations(z, c, max_iter);

        let rgb = getColorForIter(iter_n);

        image.data[i] = rgb[0];
        image.data[i + 1] = rgb[1];
        image.data[i + 2] = rgb[2];
        image.data[i + 3] = 255;
    }
}

///////////////////////////////
/////////  Renderers  //////////
///////////////////////////////
function RenderMandelbrotSet() {
    // get the canvas
    let canvas = document.getElementById("mandelbrot_canvas");
    let ctx = canvas.getContext("2d");

    // create a new image
    let image = ctx.createImageData(canvas.width, canvas.height);

    // render Mandelbrot set
    mandelbrotSet(image);

    // write image back to canvas
    ctx.putImageData(image, 0, 0);
}

function RenderJuliaSet() {
    // get the canvas
    let canvas = document.getElementById("julia_canvas");
    let ctx = canvas.getContext("2d");

    // create a new image
    let image = ctx.createImageData(canvas.width, canvas.height);

    // render Julia set
    juliaSet(image);

    // write image back to canvas
    ctx.putImageData(image, 0, 0);
}


///////////////////////////////
//////////   "main"   /////////
///////////////////////////////

// maximum iteration number for Mandelbrot computation
let max_iter = 30;

// coordinate system center
let center = new ComplexNumber(-0.5, 0);

// zoom stage
let zoom = 0;

// flag to show if mouse is pressed
let dragging = false;

// helper variables for Julia set line
let firstLinePointSet = false;
let firstLinePoint;
let secondLinePoint;
let loopVariable = 0;
let looper = null;

// helper variable for moving around
let lastPoint;

// c for Julia set creation
let juliaC = new ComplexNumber(0.4, 0.1);

function setupMandelbrot(canvas) {
    // reset color scheme and maximum iteration number
    let radios = document.getElementsByName('colors');
    radios[0].checked = true;
    let slider = document.getElementById('slider');
    slider.value = 30;

    // render
    RenderMandelbrotSet();
    RenderJuliaSet();

    // add event listeners
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
    canvas.addEventListener('mouseup', onMouseUp, false);

    // TODO 1.4c):      Uncomment the following line to enable zooming.

    canvas.addEventListener('DOMMouseScroll', onMouseWheel, false);

}


//////////////////////////////////////
//////////   Event Listeners   ///////
//////////////////////////////////////
function onMouseDown(e) {
    let canvas = document.getElementById("mandelbrot_canvas");
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    y = canvas.height - y;

    if (e.ctrlKey) {
        // choose new c for Julia set creation
        clearInterval(looper);
        juliaC = new ComplexNumberFromCoords(x, y, 'mandelbrot_canvas');
        RenderJuliaSet();
    } else if (e.shiftKey) {
        if (firstLinePointSet == false) {
            firstLinePointSet = true;
            firstLinePoint = [x, y];
            RenderMandelbrotSet();
            clearInterval(looper);
        } else {
            firstLinePointSet = false;
            secondLinePoint = [x, y];
            let c = document.getElementById('mandelbrot_canvas');
            let ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgb(255,255,255)";
            ctx.moveTo(Math.round(firstLinePoint[0]), canvas.height - Math.round(firstLinePoint[1]));
            ctx.lineTo(Math.round(secondLinePoint[0]), canvas.height - Math.round(secondLinePoint[1]));
            ctx.stroke();
            looper = setInterval(juliaLoop, 20);
            loopVariable = 0;
        }
    } else {
        // TODO 1.4c):      Store the hit point as pixel coordinates and
        //                  start the dragging process. Use the global
        //                  variables dragging (bool) and lastPoint (two
        //                  dimensional vector).
        let x_drag = x;
        let y_drag = y;
        lastPoint = [x, y];
        dragging = true; // start dragging process


    }
}


function juliaLoop() {
    let alpha = 0.5 * Math.sin(loopVariable * 0.05) + 0.5; // oscillating between 0 and 1
    juliaC = new ComplexNumberFromCoords((1 - alpha) * firstLinePoint[0] + alpha * secondLinePoint[0], (1 - alpha) * firstLinePoint[1] + alpha * secondLinePoint[1], 'mandelbrot_canvas');
    RenderJuliaSet();
    loopVariable++;
}


function onMouseMove(e) {
    if (dragging) {
        let canvas = document.getElementById("mandelbrot_canvas");
        let rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        y = canvas.height - y;

        // TODO 1.4c):      Convert both last and current hit point to
        //                  their corresponding complex numbers, compute
        //                  their distance (also as a complex number) and
        //                  shift the plane accordingly. To do so, change
        //                  the global variable center which is used to
        //                  compute the complex number corresponding to a pixel.
        let x_drag_curr = x;
        let y_drag_curr = y;

        let last_drag_cmplx = new ComplexNumberFromCoords(lastPoint[0], lastPoint[1], "mandelbrot_canvas");
        let curr_drag_cmplx = new ComplexNumberFromCoords(x_drag_curr, y_drag_curr, "mandelbrot_canvas");

        let dist_cmplx = sub(last_drag_cmplx, curr_drag_cmplx); // CHANGED : MORE INTUITIVE FOR MOUSE; LESS FOR TOUCHPAD!!!

        //move center
        center = add(center, dist_cmplx);

        // rerender image
        RenderMandelbrotSet();
    }
}

function onMouseUp(e) {
    // TODO 1.4c):      Prevent dragging of the plane once the mouse is
    //                  not pressed anymore.
    dragging = false;

}

function onMouseWheel(e) {
    let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    zoom = zoom - delta; // CHANGED : MORE INTUIITIVE FOR MOUSE; LESS FOR TOUCHPAD

    // render
    RenderMandelbrotSet();

    // do not scroll the page
    e.preventDefault();
}

function onChangeMaxIter(value) {
    max_iter = value;

    // render
    RenderMandelbrotSet();
    RenderJuliaSet();
}

function onChangeColorScheme() {
    // render
    RenderMandelbrotSet();
    RenderJuliaSet();
}
