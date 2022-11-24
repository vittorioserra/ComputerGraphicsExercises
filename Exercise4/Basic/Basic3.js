
/////////////////////////
////////   4.3   ////////
/////////////////////////

/**
 * @param {number} index - linearized image index 
 * @param {number[][]} images - array of circle images
 * @param {number[]} alphas - respective alpha values
 * @returns {number[]} - triple [r,g,b] of resulting color, each in range [0,255]
 */
/*
 function doAlphaBlending(index, images, alphas) {
    // TODO 4.3:    Compute the blended color (as an array of 3 values
    //              in the interval [0, 255]) for one pixel
    //              of the resulting image. "images" is the array
    //              of circle images from left to right, "alphas"
    //              contains the respective alpha values. "index"
    //              is the linearized index for the images, so for
    //              example with images[2][index + 1] you can address
    //              the green color channel of the current pixel 
    //              in the third image.

    // 1. Set up a color as a return value, and initialize it with the 
    //    desired background color.

    let rgba_c = [255, 255, 255, 0];

    // 2. Loop over the four circle images in the correct order to blend
    //    them one after another.

    // 3. Compute the resulting alpha value for the current pixel.
    //    If it is a background pixel of the current image (denoted
    //    with a zero alpha channel value), it should not contribute to the
    //    resulting image. Otherwise, it should contribute with the
    //    alpha value given through the sliders.

    // 4. Compute the resulting color using alpha blending in all
    //    three color channels.

    //invert alpha curr;
    //let alpha_curr = alphas[i]*255;

    //let alpha_curr = 0;

    let img_c = [0, 0, 0, 0];

    for(let i = 0; i < 3; i++){

        let alpha_slider = alphas[i]*255;
        let alpha_curr = images[i][index+4];
        if(alpha_curr == 0){

            rgba_c = [255,255, 255,0];
            img_c[0] = images[i][index];
            img_c[1] = images[i][index+1];
            img_c[2] = images[i][index+2];
            img_c[3] = images[i][index+3];

        }else{

            if(i > 0){

                rgba_c[0] = (1-alphas[i-1])*img_c[0] + images[i][index]; // r
                rgba_c[1] = (1-alphas[i-1])*img_c[1] + images[i][index+1]; // g
                rgba_c[2] = (1-alphas[i-1])*img_c[2] + images[i][index+2]; // b
                rgba_c[3] = (1-alphas[i-1])*img_c[3] + images[i][index+3]; //

            }else{

                rgba_c[0] = images[i][index]; // r
                rgba_c[1] = images[i][index+1]; // g
                rgba_c[2] = images[i][index+2]; // b
                rgba_c[3] = images[i][index+3]; // alpha

            }
        }

    }

    if(img_c > 255){
        imh_c = 255;

    }

    // 5. Return the resulting color. Replace the following dummy line.
    return rgba_c;//[255, 255, 255];
}
*/

/*
 function doAlphaBlending(index, images, alphas) {

    // TODO 4.3:    Compute the blended color (as an array of 3 values
    //              in the interval [0, 255]) for one pixel
    //              of the resulting image. "images" is the array
    //              of circle images from left to right, "alphas"
    //              contains the respective alpha values. "index"
    //              is the linearized index for the images, so for
    //              example with images[2][index + 1] you can address
    //              the green color channel of the current pixel
    //              in the third image.

    // 1. Set up a color as a return value, and initialize it with the
    //    desired background color.

    let rgba_c = [255, 255, 255, 0];

    // 2. Loop over the four circle images in the correct order to blend
    //    them one after another.

    let curr_color = [0, 0, 0, 0];

    //count number of non-zero elements

    let n_non_zero = 0;

    for(let i = 0; i < 4; i++){

        if(images[i][index+3]!=0){

            n_non_zero++;

        }

    }

    for(let i = 0; i < 4; i++){

        curr_color[0] = images[i][index+0];
        curr_color[1] = images[i][index+1];
        curr_color[2] = images[i][index+2];
        curr_color[3] = images[i][index+3];


        //check if pixel is backgorund
        if(curr_color[3] != 0){

            //check if pixel was already set --> color channels are not zero
            //(curr_color[0]!=0) | (curr_color[1]!=0) | (curr_color[2]!=0)
            if(curr_color[3]!=0){

                rgba_c[0] = rgba_c[0]*((rgba_c[3]/255.0));
                rgba_c[1] = rgba_c[1]*((rgba_c[3]/255.0));
                rgba_c[2] = rgba_c[2]*((rgba_c[3]/255.0));
                //rgba_c[3] = rgba_c[3]*(1-(rgba_c[3]/255.0));

                rgba_c[0] = rgba_c[0] + curr_color[1] * (1-alphas[i]);
                rgba_c[1] = rgba_c[1] + curr_color[2] * (1-alphas[i]);
                rgba_c[2] = rgba_c[2] + curr_color[3] * (1-alphas[i]);
                rgba_c[3] = 255*alphas[i];

            }else{

                rgba_c[0] = images[i][index+0];
                rgba_c[1] = images[i][index+1];
                rgba_c[2] = images[i][index+2];
                rgba_c[3] = (1-alphas[i])*255;

            }


            if((rgba_c[0] > 255)){

                rgba_c[0] = 255;

            }


            if((rgba_c[1] > 255)){

                rgba_c[1] = 255;

            }

            if((rgba_c[2] > 255)){

                rgba_c[2] = 255;

            }


        }

    }

    // 3. Compute the resulting alpha value for the current pixel.
    //    If it is a background pixel of the current image (denoted
    //    with a zero alpha channel value), it should not contribute to the
    //    resulting image. Otherwise, it should contribute with the
    //    alpha value given through the sliders.

    // 4. Compute the resulting color using alpha blending in all
    //    three color channels.

    return rgba_c;
}
*/

function doAlphaBlending(index, images, alphas) {
    // TODO 4.3:    Compute the blended color (as an array of 3 values
    //              in the interval [0, 255]) for one pixel
    //              of the resulting image. "images" is the array
    //              of circle images from left to right, "alphas"
    //              contains the respective alpha values. "index"
    //              is the linearized index for the images, so for
    //              example with images[2][index + 1] you can address
    //              the green color channel of the current pixel
    //              in the third image.

    let rgba_c = [255, 255, 255, 0];

    let curr_color = [0, 0, 0, 0];

    //count number of non-zero elements

    let n_non_zero = 0;
    let already_set = 0;

    for(let i = 0; i < 4; i++){

        if((images[i][index+0]!=0)|(images[i][index+1]!=0)|(images[i][index+2]!=0)){

            n_non_zero++;

        }

    }

    //console.log("%i circles on pixel", n_non_zero);

    for(let i = 0; i < 4; i++){

        //if just one element, set solid color, there will be only one element there anyway!
        if((n_non_zero == 1)){

            //set only if elements are ok and not zero

            if((images[i][index+0]!=0)|(images[i][index+1]!=0)|(images[i][index+2]!=0)){

                rgba_c[0] = images[i][index+0];
                rgba_c[1] = images[i][index+1];
                rgba_c[2] = images[i][index+2];
                rgba_c[3] = (alphas[i])*255;

                already_set = 1;
            }

        }else if((n_non_zero > 1)){

            //update only if current element is not zero, already set plays no role
            if((images[i][index+0]!=0)|(images[i][index+1]!=0)|(images[i][index+2]!=0)){

                rgba_c[0] = rgba_c[0]*((rgba_c[3]/255.0));
                rgba_c[1] = rgba_c[1]*((rgba_c[3]/255.0));
                rgba_c[2] = rgba_c[2]*((rgba_c[3]/255.0));
                //rgba_c[3] = rgba_c[3]*(1-(rgba_c[3]/255.0));

                rgba_c[0] = rgba_c[0] + images[i][index+0] * (1-alphas[i]);
                rgba_c[1] = rgba_c[1] + images[i][index+2] * (1-alphas[i]);
                rgba_c[2] = rgba_c[2] + images[i][index+2] * (1-alphas[i]);
                rgba_c[3] = 255*alphas[i];

            }


        }else if(n_non_zero == 0){

            //then we have a backgorund color

            rgba_c = [255,255,255,0];

        }

    }

    return rgba_c;
}


function Basic3(canvas) {
    let alphas = [0.5, 0.5, 0.5, 0.5];

    // setup default values and event listeners
    let sliders = document.getElementsByName("alpha");
    for (let slider of sliders) {
        slider.addEventListener("change",onChangeAlpha);
        slider.value = 0.5;
    }
    let srcImages = document.getElementsByName("srcImage");
    for (let img of srcImages) {
        img.addEventListener("drop",drop);
        img.addEventListener("dragover",allowDrop);
        img.children[0].addEventListener("dragstart",drag);
    }

    // render
    render();

    function render() {
        let context = canvas.getContext("2d");
        let img = context.createImageData(canvas.width, canvas.height);

        let images = [getImageInContainer("div0"),
                      getImageInContainer("div1"),
                      getImageInContainer("div2"),
                      getImageInContainer("div3")];

        // walk over the canvas image and set the blended color for each pixel
        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                // compute the linearized index for the image data array
                let i = 4 * (x + canvas.width * y);
                // compute the blended color using the index, the four circle images and the alpha values
                let color = doAlphaBlending(i, images, alphas);
                // set the color acco+rdingly, alpha value is always 255
                img.data[i] = color[0];
                img.data[i + 1] = color[1];
                img.data[i + 2] = color[2];
                img.data[i + 3] = 255;
            }
        }

        context.putImageData(img, 0, 0);
    }

    function getImageInContainer(container) {
        let image = document.getElementById(container).children[0];
        let c = document.createElement('canvas');
        c.width = canvas.width;
        c.height = canvas.height;
        canvas.getContext('2d').clearRect(0, 0, c.width, c.height);
        canvas.getContext('2d').drawImage(image, 0, 0, c.width, c.height);
        let data = canvas.getContext('2d').getImageData(0, 0, c.width, c.height).data;
        return data;
    }


    //////////////////////////
    ///// Event Listener /////
    //////////////////////////

    /**
     * @param {string} id - id ending in a single digit decimal number
     * @returns {number} single digit decimal number
     */
    function getIndex(id){ return -(-id[id.length-1]);  }

    function onChangeAlpha() {
        // expecting id "alpha0" to "alpha3"
        alphas[getIndex(this.id)] = this.value;
        render();
    }

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function drag(ev) {
        ev.dataTransfer.setData("src", ev.target.id);
    }

    function drop(ev) {
        ev.preventDefault();
        let id = ev.dataTransfer.getData("src");

        let src = document.getElementById( id );
        let srcParent = src.parentNode;
        let tgt = ev.currentTarget.fir+stElementChild;

        // expecting id "div0" to "div4"
        let a = getIndex(srcParent.id);
        let b = getIndex(tgt.parentNode.id);

        let sliders = document.getElementsByName("alpha");
        let tmp = alphas[a];
        alphas[a] = alphas[b];
        sliders[a].value = sliders[b].value;
        alphas[b] = tmp;
        sliders[b].value = tmp;

        ev.currentTarget.replaceChild(src, tgt);
        srcParent.appendChild(tgt);

        render();
    }
}
