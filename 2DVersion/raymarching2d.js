let mouseX = 10;
let mouseY = 10;
let clientW = 0;
let clientH = 0;
let ctx = null;
let camera = {cx: 0, cy: 0};

let circles = [];

$(document).ready(function()
{
    console.log("Started well!");

    const canvas = document.getElementById('cnv');
    ctx = canvas.getContext('2d');
    clientW = self.innerWidth;
    clientH = self.innerHeight;
  
    canvas.width = clientW;
    canvas.height = clientH;
    camera.cx = clientW * 0.2;
    camera.cy = clientH * 0.5;

    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mousedown', updateCamera, false);
    setInterval(update, 15);
    
    circles = [
        {cx: clientW * 0.6, cy: clientH * 0.4, radius: clientW * 0.05},
        {cx: clientW * 0.3, cy: clientH * 0.7, radius: clientW * 0.03}
    ]
})

function update()
{   
    ctx.clearRect(0, 0, clientW, clientH);
    drawCamera();
    circles.forEach(circle => {
        drawCircle(circle.cx, circle.cy, circle.radius);
    });

    rayMarching();

    drawCircle(mouseX, mouseY, 5);
}

function rayMarching()
{
    let currentPoint = {cx: camera.cx, cy: camera.cy};
    let dx = mouseX - camera.cx;
    let dy = mouseY - camera.cy;
    let len = Math.sqrt(dx * dx + dy * dy);
    dx /= len;
    dy /= len;

    for(let iteration = 0; iteration < 50; ++iteration)
    {
        let nearestR = calculateNearestCirlce(currentPoint.cx, currentPoint.cy);
        if(nearestR > 0)
            drawCircle(currentPoint.cx, currentPoint.cy, nearestR, 'blue');

        if(nearestR > clientW * 0.5 || nearestR < 2)
            break;

        let nx = currentPoint.cx + dx * nearestR;
        let ny = currentPoint.cy + dy * nearestR;

        drawCircle(nx, ny, 3, 'blue', 'red', true);

        currentPoint.cx = nx;
        currentPoint.cy = ny;
    }
}

function drawCamera()
{
    drawCircle(camera.cx, camera.cy, 10, 'black', 'black', true);
}

function drawCircle(centerX, centerY, radius, 
    strokeStyle = 'black', fillStyle = 'black', fill = false)
{
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    if (fill)
     ctx.fill();
    ctx.stroke();
}

function onMouseMove(e)
{
    mouseX = e.pageX;
    mouseY = e.pageY;
}

function updateCamera(e)
{
    camera.cx = e.pageX;
    camera.cy = e.pageY;
}

/// returns distance to nearest circle from camera
function calculateNearestCirlce(fromX, fromY)
{
    // distance to first circle in array
    let minD = Math.hypot(fromX - circles[0].cx, fromY - circles[0].cy) - circles[0].radius;
    for(let i = 1; i < circles.length; ++i)
    {
        let currentD = Math.hypot(fromX - circles[i].cx, fromY - circles[i].cy) - circles[i].radius;
        if(minD > currentD)
        {
            minD = currentD
        }
    }

    return minD;
}