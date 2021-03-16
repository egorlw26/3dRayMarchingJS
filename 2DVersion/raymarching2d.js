let mouseX = 10;
let mouseY = 10;
let clientW = 0;
let clientH = 0;
let ctx = null;
let camera = {cx: 0, cy: 0};

let objects = [];

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
    
    objects = [
        {type: "circle", cx: clientW * 0.6, cy: clientH * 0.4, radius: clientW * 0.08},
        {type: "circle", cx: clientW * 0.3, cy: clientH * 0.7, radius: clientW * 0.1},
        {type: "square", cx: clientW * 0.4, cy: clientH * 0.5, width: clientW * 0.1},
        {type: "square", cx: clientW * 0.8, cy: clientH * 0.6, width: clientW * 0.15},
    ]
})

function update()
{   
    ctx.clearRect(0, 0, clientW, clientH);
    ctx.lineWidth = 1.5;
    drawCamera();
    objects.forEach(object => {
        if(object.type == 'circle')
            drawCircle(object.cx, object.cy, object.radius, '#334242', '#0E51A7', true);
        if(object.type == 'square')
            drawSquare(object.cx, object.cy, object.width, '#334242', '#0E51A7', true);
            
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
        let nearestR = calculateNearestObject(currentPoint.cx, currentPoint.cy);
        if(nearestR > 0)
            drawCircle(currentPoint.cx, currentPoint.cy, nearestR, '#FF9E00');

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
    drawCircle(camera.cx, camera.cy, 10, 'black', '#334242', true);
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

function drawSquare(centerX, centerY, width, 
    strokeStyle = 'black', fillStyle = 'black', fill = false)
{
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
    ctx.rect(centerX - width/2, centerY - width/2, width, width);
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

/// returns distance to nearest object from camera
function calculateNearestObject(fromX, fromY)
{
    // distance to first circle in array
    let minD = Number.MAX_SAFE_INTEGER;
    for(let i = 0; i < objects.length; ++i)
    {
        if(objects[i].type == 'circle')
        {
            let currentD = Math.hypot(fromX - objects[i].cx, fromY - objects[i].cy) - objects[i].radius;
            if(minD > currentD)
            {
                minD = currentD
            }
        }
        else if(objects[i].type == 'square')
        {
            let currentD = distanceToSquare(fromX, fromY, objects[i]);
            if(minD > currentD)
            {
                minD = currentD
            }
        }
    }
    return minD;
}

/// return distance to square from some point
function distanceToSquare(fromX, fromY, square)
{
    // All squares now axis-aligned, so I use tricks for distance
    let halfWidth = square.width/2;
    let minX = square.cx - halfWidth;
    let maxX = square.cx + halfWidth;
    let minY = square.cy - halfWidth;
    let maxY = square.cy + halfWidth;

    if(fromX > minX && fromX < maxX)
    {
        return Math.abs(fromY - square.cy) - halfWidth;
    }
    else if(fromY > minY && fromY < maxY)
    {
        return Math.abs(fromX - square.cx) - halfWidth;
    }
    else
    {
        let nvx = minX;
        if(fromX >= maxX)
        {
            nvx = maxX;
        }
        let nvy = minY;
        if(fromY >= maxY)
        {
            nvy = maxY;
        }
        return Math.hypot(fromX - nvx, fromY - nvy);
    }
}