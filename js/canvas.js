/*jslint plusplus:true*/
/*global console*/
var gradOne, gradTwo, drawBezire, addPoint, createRandomPoints, animate, animateBackground, getMax,
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    w = canvas.clientWidth,
    h = canvas.clientHeight,
    maxY = h;
ctx.fillStyle = "#2b2d3c";
ctx.fillRect(0, 0, w, h);
gradOne = ctx.createLinearGradient(0, 0, 0, h);
gradOne.addColorStop(0, "#2570b0");
gradOne.addColorStop(1, "#2b2d3c");
ctx.fillStyle = gradOne;
ctx.strokeStyle = "#2196f3";
var XHR = new XMLHttpRequest(),
    points;
XHR.open('GET', './points.txt', true);
XHR.send();
XHR.onreadystatechange = function () {
    'use strict';
    if (XHR.readyState === 4 && XHR.status === 200) {
        points = JSON.parse(XHR.responseText);
        animate(points, 5000 / points.length);
    }
};
var i = 0,
    intstroke,
    intfill;
function animate(p, t) {
    'use strict';
    ctx.strokeStyle = "#0ff";
    ctx.beginPath();
    ctx.moveTo(parseInt(p[0].x, 10), parseInt(p[0].y, 10));
    intstroke = setInterval(function () {
        ctx.lineWidth = 5;
        ctx.lineTo(parseInt(p[i].x, 10), parseInt(p[i].y, 10));
        ctx.lineJoin = 'round';
        ctx.stroke();
        maxY = getMax(maxY, parseInt(p[i].y, 10));
        i++;
        if (i === p.length) {
            ctx.lineWidth = 0;
            ctx.lineTo(w, h);
            ctx.lineTo(0, h);
            ctx.closePath();
            animateBackground(gradOne);
            clearInterval(intstroke);
        }
    }, t);
}
function getMax(num1, num2) {
    'use strict';
    return num1 < num2 ? num1 : num2;
}
function animateBackground(color) {
    'use strict';
//    ctx.save();
    ctx.fillStyle = color;
    ctx.clip();
    console.log(maxY);
    intfill = setInterval(function () {
        ctx.fillRect(0, 0, w, maxY + 1);
        maxY += 1;
        if (maxY >= h) {
            clearInterval(intfill);
        }
    }, 10);
//    ctx.restore();
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
    ctx.fill();
//    ctx.strokeText("(" + x + ", " + y + ")", x, y - 10);
    ctx.closePath();
    ctx.restore();
}
