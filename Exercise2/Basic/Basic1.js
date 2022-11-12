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
    var swap = false; //if x0 and x1 are interchanged, it turns to true
    
    if (x0>x1){
        var aux = x0;
        x0 = x1;
        x1 = aux;
        aux = y0;
        y0 = y1;
        y1 = aux;
        swap = true;
    }

    // TODO 2.1     Write code to draw a line
    //              between the start point and
    //              the end point. To make things
    //              easier, there are some comments
    //              on what to do next: 

    // compute deltas and update directions
    var delta_x = x1 - x0;
    var delta_y = Math.abs(y1 - y0);
    //complete directions
    

    // set initial coordinates
    var x = x0;
    var y = y0;
    if (Math.abs(delta_x)<delta_y){ //if the slope is greater than 1, x and y are swapped
        aux = y;
        y = x;
        x = aux;
        aux = delta_x
        delta_x = delta_y;
        delta_y = aux;
        var D = delta_x - 2*delta_y;
        var delta_DE = -2*delta_y;
        var delta_DNE = 2*(delta_x - delta_y);
        var slope_1 = true;
        
    }else{
        var D = delta_x - 2*delta_y;
        var delta_DE = -2*delta_y;
        var delta_DNE = 2*(delta_x - delta_y);
        var slope_1 = false;
    }

    // start loop to set nPixels 
    let nPixels = delta_x; // think about how many pixels need to be set - zero is not correct ;)
    
    for (let i = 0; i < nPixels; ++i) {
        // set pixel using the helper function setPixelS()
        if(slope_1){ //if slope is greater than one
            setPixelS(image,new Point(y, x),new Color(0,0,0),pixelScale);
                if((y1 - y0 < 0) & slope_1){// if the slope is negative and the absolute value is greater than one
                    x = x - 1 
                }else{
                    x = x + 1;
                }
        }else{
            setPixelS(image,new Point(x, y),new Color(0,0,0),pixelScale);
            if((y1 - y0 < 0) & slope_1){// if the slope is negative and the absolute value is greater than one
                x = x - 1
            }else{
                x = x + 1;
            }        
        }
        
        if(D<=0){
            if((y1 - y0 < 0)&(!slope_1)){// if the slope is negative and the absolute value is less than 1
                y = y - 1;
            }else{
                y = y + 1;
            }
            D = D + delta_DNE;
            
        }else{
                D = D + delta_DE;
        }
        // update error


        // update coordinates depending on the error


    }
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
