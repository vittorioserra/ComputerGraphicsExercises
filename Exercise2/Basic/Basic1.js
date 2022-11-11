"use strict";

///////////////////////////
//// global variables  ////
///////////////////////////

// pixel scale
let pixelScale = 10;

// line
let line = new Line(    new Point( 10 / pixelScale,  10 / pixelScale),
                        new Point(180 / pixelScale, 180 / pixelScale),
                        new Color(0, 0, 0));

//////////////
//// gui  ////
//////////////

// event listener for gui
function onChangePixelScale(value) {
    // rescale line
    let s = pixelScale / value;
    line.startPoint.x = line.startPoint.x * s;
    line.startPoint.y = line.startPoint.y * s;
    line.endPoint.x = line.endPoint.x * s;
    line.endPoint.y = line.endPoint.y * s;
    // set new scaling factor
    pixelScale = value;
    // rerender scene
    RenderCanvas1();
}

function onMouseDownCanvas1(e) {
    let rect = document.getElementById("canvas1").getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    console.log("onMouseDownCanvas1: " + x + " " + y);

    // set new points
    if (e.ctrlKey) {
        line.endPoint.x = x / pixelScale;
        line.endPoint.y = y / pixelScale;
    } else {
        line.startPoint.x = x / pixelScale;
        line.startPoint.y = y / pixelScale;
    }

    // rerender image
    RenderCanvas1();
}


//////////////////////////////
//// bresenham algorithm  ////
//////////////////////////////

function bresenham(image, line) {
    // ensure integer coordinates


    let x0 = Math.floor(line.startPoint.x);
    let y0 = Math.floor(line.startPoint.y);
    let x1 = Math.floor(line.endPoint.x);
    let y1 = Math.floor(line.endPoint.y);

    // TODO 2.1     Write code to draw a line
    //              between the start point and
    //              the end point. To make things
    //              easier, there are some comments
    //              on what to do next: 

    // compute deltas and update directions

    let m = (y1- y0)/(x1-x0);

    let delta_x = x1-x0;
    let delta_y = y1-y0;

    if(Math.abs(delta_x) > Math.abs(delta_y)){

        //determine increment direction

        let incx=Math.sign(delta_x);
        let incy=Math.sign(delta_y);

        if(delta_x <0){
            delta_x = -delta_x;
        }

        if(delta_y < 0){
            delta_y = -delta_y;
        }

        let pdx = 0;
        let pdy = 0;
        let ddx = 0;
        let ddy = 0;
        let deltaSlowdirection = 0;
        let deltaFastdirection = 0;
        let err = 0;

        if(delta_x>delta_y){

            pdx = incx;
            pdy = 0;
            ddx = incx;
            ddy = incy;
            deltaSlowdirection = delta_y;
            deltaFastdirection = delta_x;

        }else{
            pdx = 0;
            pdy = incy;
            ddx = incx;
            ddy = incy;
            deltaSlowdirection = delta_y;
            deltaFastdirection = delta_y;
        }

        let x = x0;
        let y = y0;
        err = deltaFastdirection/2;

        let local_point = new Point(x, y);
        setPixelS(image, local_point, new Color(0,0,0), pixelScale);

        for(let t = 0; t < deltaFastdirection; ++t){
            err = err - deltaSlowdirection;

            if(err < 0){
                err = err + deltaFastdirection;
                x = x + ddx;
                y = y + ddy;
            }else{
                x = x + pdx;
                y = y + pdy;
            }

            local_point = new Point(x, y);
            setPixelS(image, local_point, new Color(0,0,0), pixelScale);
        }

    }else{

        //strategy : swap x and y
        //determine increment direction

        let x0 = Math.floor(line.startPoint.y);
        let y0 = Math.floor(line.startPoint.x);
        let x1 = Math.floor(line.endPoint.y);
        let y1 = Math.floor(line.endPoint.x);

        // TODO 2.1     Write code to draw a line
        //              between the start point and
        //              the end point. To make things
        //              easier, there are some comments
        //              on what to do next:

        // compute deltas and update directions

        let m = (y1- y0)/(x1-x0);

        let delta_x = x1-x0;
        let delta_y = y1-y0;

        delta_x = delta_x
        delta_y = delta_y

        let incx=Math.sign(delta_x);
        let incy=Math.sign(delta_y);

        if(delta_x <0){
            delta_x = -delta_x;
        }

        if(delta_y < 0){
            delta_y = -delta_y;
        }

        let pdx = 0;
        let pdy = 0;
        let ddx = 0;
        let ddy = 0;
        let deltaSlowdirection = 0;
        let deltaFastdirection = 0;
        let err = 0;

        if(delta_x>delta_y){

            pdx = incx;
            pdy = 0;
            ddx = incx;
            ddy = incy;
            deltaSlowdirection = delta_y;
            deltaFastdirection = delta_x;

        }else{
            pdx = 0;
            pdy = incy;
            ddx = incx;
            ddy = incy;
            deltaSlowdirection = delta_y;
            deltaFastdirection = delta_y;
        }

        let x = y0;
        let y = x0;
        err = deltaFastdirection/2;

        let local_point = new Point(x, y);
        setPixelS(image, local_point, new Color(0,0,0), pixelScale);

        for(let t = 0; t < deltaFastdirection; ++t){
            err = err - deltaSlowdirection;

            if(err < 0){
                err = err + deltaFastdirection;
                y = y + ddx;
                x = x + ddy;
            }else{
                y = y + pdx;
                x = x + pdy;
            }

            local_point = new Point(x, y);
            setPixelS(image, local_point, new Color(0,0,0), pixelScale);
        }

    }
    //console.log(m_float);

    /*

    // set initial coordinates

    let y = y0;
    let x = x0;

    let delta_x = x1 - x0;
    let delta_y = y1 - y0;
    //console.log(delta_x)
    //console.log(delta_y)

    //let D = delta_x - Math.round(2*delta_y);
    //let delta_DE = Math.round(-2*delta_y);
    //let delta_DNE= Math.round(2*(delta_x - delta_y));
    //console.log(D)

    // start loop to set nPixels 
    let nPixels = delta_x;

    //second octant
    if((m_float >= 0.0)&( m_float < 1)&(x0 < x1)){

        let D = delta_x - Math.round(2*delta_y);
        let delta_DE = Math.round(-2*delta_y);
        let delta_DNE= Math.round(2*(delta_x - delta_y));

        console.log("1. Oktant");

        for (let i = 0; i < nPixels; ++i) {

            let local_point = new Point(x,y);

            setPixelS(image, local_point, new Color(0,0,0), pixelScale);

            if(D < 0){

                y = y+1;
                D = D + delta_DNE;

            }else{

                D = D + delta_DE;

            }

            x = x + 1;


        }

    }

   if((m_float >= -1.0)&( m_float < 0)&(x0 < x1)){

        delta_y = -1*delta_y

        let D = Math.round(2*delta_y) - delta_x;
        let delta_DE = Math.round(-2*delta_y);
        let delta_DNE= Math.round(2*(delta_x - delta_y));

        console.log("D : %i", D)
        console.log("2. Oktant");

        for (let i = 0; i < nPixels; ++i) {

            let local_point = new Point(x,y);

            setPixelS(image, local_point, new Color(0,0,0), pixelScale);

            console.log("X : %i ", x)
            console.log("Y : %i ", y)

            // update coordinates depending on the error

            if(D > 0){
                D = D - delta_DNE;
                y = y-1;
            }else{
                D = D - delta_DE;
            }

            x = x + 1;

            console.log("D : %i", D)
        }

    }

    //gespiegelt
    if((m_float >= 0.0)&( m_float < 1)&(x1 < x0)){


        let y = y1;
        let x = x1;

        let delta_x = -(x1 - x0);
        let delta_y = -(y1 - y0);
        //console.log(delta_x)
        //console.log(delta_y)

        //let D = delta_x - Math.round(2*delta_y);
        //let delta_DE = Math.round(-2*delta_y);
        //let delta_DNE= Math.round(2*(delta_x - delta_y));
        //console.log(D)

        // start loop to set nPixels
        let nPixels = delta_x;

        let D = delta_x - Math.round(2*delta_y);
        let delta_DE = Math.round(-2*delta_y);
        let delta_DNE= Math.round(2*(delta_x - delta_y));

        console.log("3. Oktant");

        for (let i = 0; i < nPixels; ++i) {

            let local_point = new Point(x,y);

            setPixelS(image, local_point, new Color(0,0,0), pixelScale);

            if(D < 0){

                y = y+1;
                D = D + delta_DNE;

            }else{

                D = D + delta_DE;

            }

            x = x + 1;


        }

    }

    if((m_float >= -1.0)&( m_float < 0)&(x1 < x0)){

        let y = y1;
        let x = x1;

        let delta_x = -(x1 - x0);
        let delta_y = -(y1 - y0);

        delta_y = -1*delta_y

        let D = Math.round(2*delta_y) - delta_x;
        let delta_DE = Math.round(-2*delta_y);
        let delta_DNE= Math.round(2*(delta_x - delta_y));

        let nPixels = delta_x;

        console.log("D : %i", D)
        console.log("4. Oktant");

        for (let i = 0; i < nPixels; ++i) {

            let local_point = new Point(x,y);

            setPixelS(image, local_point, new Color(0,0,0), pixelScale);

            console.log("X : %i ", x)
            console.log("Y : %i ", y)

            // update coordinates depending on the error

            if(D > 0){
                D = D - delta_DNE;
                y = y-1;
            }else{
                D = D - delta_DE;
            }

            x = x + 1;

            console.log("D : %i", D)
        }

    }

    if((m_float > 1.0)&(m_float < Infinity )&(y0<y1)){

        console.log(m_float)

        let x1_t = x1;
       let x0_t = x0;

       x0 = y0;
       x1 = y1;

       y0 = x0;
       y1 = x1;


        let y = y1;
        let x = x1;

        let delta_x = (x1 - x0);
        let delta_y = (y1 - y0);

        let D = delta_x - Math.round(2*delta_y);
        let delta_DE = Math.round(-2*delta_y);
        let delta_DNE= Math.round(2*(delta_x - delta_y));

        console.log("5. Oktant");

        for (let i = 0; i < nPixels; ++i) {

            let local_point = new Point(x,y);

            setPixelS(image, local_point, new Color(0,0,0), pixelScale);

            if(D < 0){

                y = y-1;
                D = D + delta_DNE;

            }else{

                D = D + delta_DE;

            }

            x = x - 1;


        }

    }


   if((m_float >= -1.0*Infinity)&( m_float < -1)&(y0 < y1)){


       let x1_t = x1;
       let x0_t = x0;

       x0 = y0;
       x1 = y1;

       y0 = x0;
       y1 = x1;

      let y = y0;
      let x = x0;

      let delta_x = x1 - x0;
      let delta_y = y1 - y0;


        delta_y = -1*delta_y

        let D = Math.round(2*delta_y) - delta_x;
        let delta_DE = Math.round(-2*delta_y);
        let delta_DNE= Math.round(2*(delta_x - delta_y));

        console.log("D : %i", D)
        console.log("6. Oktant");

        for (let i = 0; i < nPixels; ++i) {

            let local_point = new Point(x,y);

            setPixelS(image, local_point, new Color(0,0,0), pixelScale);

            console.log("X : %i ", x)
            console.log("Y : %i ", y)

            // update coordinates depending on the error

            if(D > 0){
                D = D - delta_DNE;
                x = x-1;
            }else{
                D = D - delta_DE;
            }

            y = y + 1;

            console.log("D : %i", D)
        }

    }

    /*
    if((m_float >= 1)&( m_float < Infinity)&(y0 < y1)){


       let x1_t = x1;
       let x0_t = x0;

       x0 = y0;
       x1 = y1;

       y0 = x0;
       y1 = x1;

      let y = y0;
      let x = x0;

      let delta_x = x1 - x0;
      let delta_y = y1 - y0;


        //delta_y = -1*delta_y

        let D = Math.round(2*delta_y) - delta_x;
        let delta_DE = Math.round(-2*delta_y);
        let delta_DNE= Math.round(2*(delta_x - delta_y));

        console.log("D : %i", D)
        console.log("20. Oktant");

        for (let i = 0; i < nPixels; ++i) {

            let local_point = new Point(x,y);

            setPixelS(image, local_point, new Color(0,0,0), pixelScale);

            console.log("X : %i ", x)
            console.log("Y : %i ", y)

            // update coordinates depending on the error

            if(D > 0){
                D = D - delta_DNE;
                x = x-1;
            }else{
                D = D - delta_DE;
            }

            y = y + 1;

            console.log("D : %i", D)
        }

    }
    */


}


//////////////////////////
//// render function  ////
//////////////////////////

function RenderCanvas1() {
    // get canvas handle
    let context = document.getElementById("canvas1").getContext("2d");
    let canvas = context.createImageData(200, 200);

    // clear canvas
    clearImage(canvas, new Color(255, 255, 255));

    // draw line
    bresenham(canvas, line);

    // draw start and end point with different colors
    setPixelS(canvas, line.startPoint, new Color(255, 0, 0), pixelScale);
    setPixelS(canvas, line.endPoint, new Color(0, 255, 0), pixelScale);

    // show image
    context.putImageData(canvas, 0, 0);
}


function setupBresenham(canvas) {
    // execute rendering
    RenderCanvas1();
    // add event listener
    document.getElementById("canvas1").addEventListener('mousedown', onMouseDownCanvas1, false);
}
