"use strict"

//as far as I could see, thsi canvas begins at 0,0, so all center coordinates must be decreased by unity

function drawArcCircle(canvas) {
    let context = canvas.getContext("2d");
    let img = context.createImageData(200, 200);
    context.fillStyle = 'rgba(0, 255, 0)';
    context.strokeStyle = 'rgba(0, 127, 0)';
    context.lineWidth = 20;
    context.beginPath();
    context.arc(140-1, 140-1, 45, 0, 2 * Math.PI);
    context.fill()
    context.stroke();
    context.moveTo(60+50-1, 60-1);
    context.arc(60-1, 60-1, 50, 0, 2 * Math.PI);
    context.fill();

}
