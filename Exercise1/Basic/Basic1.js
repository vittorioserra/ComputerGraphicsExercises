"use strict"

function drawPixelwiseCircle(canvas) {
    let context = canvas.getContext("2d");
    let img = context.createImageData(200, 200);

    //TODO 1.1a)      Copy the code from Example.js
    //                and modify it to create a 
    //                circle.

    let x_c = 100;
    let y_c = 100;

    let r_c = 50;

    var norm = 0;

    var fb_pos = 0;

    for(let y = 0; y < 200; y += 1){

        for(let x = 0; x < 200; x+= 1){

            fb_pos = y*200*4 + x*4;

            norm = Math.sqrt(Math.pow((x - x_c), 2) + Math.pow((y - y_c), 2))

            if(norm < r_c){

                img.data[fb_pos] = 0;
                img.data[fb_pos + 1] = 255;
                img.data[fb_pos + 2] = 0;
                img.data[fb_pos + 3] = 255;

            }

        }

    }
    context.putImageData(img, 0, 0);
}

function drawContourCircle(canvas) {
    let context = canvas.getContext("2d");
    let img = context.createImageData(200, 200);

    //TODO 1.1b)      Copy your code from above
    //                and extend it to receive a
    //                contour around the circle.


    let x_c = 100;
    let y_c = 100;

    let rb_in = 45;
    let rb_out = 55;

    var norm = 0;

    var fb_pos = 0;

    for(let y = 0; y < 200; y += 1){

        for(let x = 0; x < 200; x+= 1){

            fb_pos = y*200*4 + x*4;

            norm = Math.sqrt(Math.pow((x - x_c), 2) + Math.pow((y - y_c), 2))

            if(norm < rb_in){

                img.data[fb_pos] = 0;
                img.data[fb_pos + 1] = 255;
                img.data[fb_pos + 2] = 0;
                img.data[fb_pos + 3] = 255;

            }

            if((norm >= rb_in ) & (norm < rb_out)){

                img.data[fb_pos] = 0;
                img.data[fb_pos + 1] = 127;
                img.data[fb_pos + 2] = 0;
                img.data[fb_pos + 3] = 255;

            }

        }

    }

    context.putImageData(img, 0, 0);
}

function drawSmoothCircle(canvas) {
    let context = canvas.getContext("2d");
    let img = context.createImageData(200, 200);


    let x_c = 100;
    let y_c = 100;

    let rb_in = 45;
    let rb_out = 55;

    let norm = 0;

    let fb_pos = 0;

    for(let y = 0; y < 200; y += 1){

        for(let x = 0; x < 200; x+= 1){

            fb_pos = y*200*4 + x*4;

            norm = Math.sqrt(Math.pow((x - x_c), 2) + Math.pow((y - y_c), 2))

            if(norm < rb_in){

                img.data[fb_pos] = 0;
                img.data[fb_pos + 1] = 255;
                img.data[fb_pos + 2] = 0;
                img.data[fb_pos + 3] = 255;

            }

            if((norm > (rb_in+1) ) && (norm < rb_out)){

                img.data[fb_pos] = 0;
                img.data[fb_pos + 1] = 127;
                img.data[fb_pos + 2] = 0;
                img.data[fb_pos + 3] = 255;

            }

            if((norm >= (rb_in)) && (norm <= (rb_in + 1))){

                img.data[fb_pos] = 0;
                img.data[fb_pos + 1] = interp(norm, 45, 255, 127)//210;
                img.data[fb_pos + 2] = 0;
                img.data[fb_pos + 3] = 255;

            }

            //TODO : look over the interpolation functions once again !, this is trick with the alpha channel, it should not be like this

            if((norm >= (rb_out)) && (norm < (rb_out + 1))){

                img.data[fb_pos] = 0;
                img.data[fb_pos + 1] = 127;//interp_mod(norm, 55, 255, 127);
                img.data[fb_pos + 2] = 0;
                img.data[fb_pos + 3] = interp(norm, 55, 255, 0);

            }


        }

    }


    context.putImageData(img, 0, 0);
}

function interp(dist, target_r, start_c, end_c){

        let pixel_val = 0;

        let t = target_r - dist;

        if(start_c > end_c){

            pixel_val = start_c - t*(end_c - start_c);

        }

        //if(start_c <= end_c){

        //    pixel_val = start_c + t*(start_c - end_c);
start_c
        //}

        return pixel_val;

}


function interp_mod(dist, target_r, start_c, end_c){

        let pixel_val = 0;

        let t = target_r - dist;

        pixel_val = end_c + t*(end_c - start_c);

        return pixel_val;

}
