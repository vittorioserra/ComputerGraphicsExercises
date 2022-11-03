"use strict"

function drawArcCircle(canvas) {
    let context = canvas.getContext("2d");
    let img = context.createImageData(200, 200);
    context.fillStyle = 'rgba(0, 255, 0)';
    context.strokeStyle = 'rgba(0, 127, 0)';
    context.lineWidth = 20;
    context.beginPath();
    context.arc(140, 140, 45, 0, 2 * Math.PI);
    context.fill()
    context.stroke();
    context.moveTo(60+50, 60);
    context.arc(60, 60, 50, 0, 2 * Math.PI);
    context.fill();

}
