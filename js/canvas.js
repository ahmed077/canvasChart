/*jslint plusplus:true*/
/*global console*/
var gradOne, gradTwo, drawBezire, addPoint, createRandomPoints,
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    w = canvas.clientWidth,
    h = canvas.clientHeight;
ctx.fillStyle = "#2b2d3c";
ctx.fillRect(0, 0, w, h);
gradOne = ctx.createLinearGradient(0, 0, 0, h);
gradOne.addColorStop(0, "#2570b0");
gradOne.addColorStop(1, "#2b2d3c");
ctx.fillStyle = gradOne;
ctx.fillRect(0, h / 2, w, h / 2);
ctx.beginPath();
ctx.moveTo(0, 100);
ctx.lineTo(w, 100);
ctx.strokeStyle = "#2196f3";
ctx.stroke();
ctx.fillStyle = 'red';

drawBezire(0, h / 2, 50, -30 + h / 2, 100, h / 2, 100, h / 2);
drawBezire(100, h / 2, 50 + 100, -30 + h / 2, 100 + 100, h / 2, 100 + 100, h / 2);
drawBezire(200, h / 2, 50 + 200, -30 + h / 2, 100 + 200, h / 2, 100 + 200, h / 2);

var XHR = new XMLHttpRequest(),
    points;
XHR.open('GET', './points.txt', true);
XHR.send();
XHR.onreadystatechange = function () {
    'use strict';
    if (XHR.readyState === 4 && XHR.status === 200) {
        points = JSON.parse(XHR.responseText);
        animate();
    }
};
var i = 0,
    coords = {x: 0, y: 0},
    int;
function animate() {
    'use strict';
    ctx.save();
    ctx.strokeStyle = "#0ff";
    ctx.beginPath();
    ctx.moveTo(0, 350);
    int = setInterval(function () {
        ctx.closePath();
        ctx.lineTo(parseInt(points[i].x, 10), parseInt(points[i].y, 10));
        ctx.moveTo(parseInt(points[i].x, 10), parseInt(points[i].y, 10));
        ctx.stroke();
        i++;
        if (i > w) {
            ctx.closePath();
            ctx.restore();
            clearInterval(int);
        }
    }, 5);
    
}
function drawBezire(sx, sy, cpx1, cpy1, cpx2, cpy2, ex, ey) {
    'use strict';
    ctx.save();
//    addPoint(sx, sy);
//    addPoint(cpx1, cpy1);
//    addPoint(cpx2, cpy2);
//    addPoint(ex, ey);
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, ex, ey);
    ctx.strokeStyle = 'red';
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

function addPoint(x, y) {
    'use strict';
    ctx.closePath();
    ctx.save();
    ctx.ellipse(x, y, 5, 5, 0, 0, Math.PI * 2);
//    ctx.font = '20px Arial';
//    ctx.fillText("(" + x + ", " + y + ")", x, y - 10);
//    ctx.strokeStyle = "#fff";
//    ctx.strokeText("(" + x + ", " + y + ")", x, y - 10);
    ctx.closePath();
    ctx.restore();
}
