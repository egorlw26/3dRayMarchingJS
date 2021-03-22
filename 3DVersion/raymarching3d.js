let ctx = null;
let objects = [];
let screenWidth = 0;
let screenHeight = 0;
let camera = null;
let renderer = null;
let mouseX = 0;
let mouseY = 0;

$(document).ready(function()
{
    let canvas = document.getElementById("cnv");
    ctx = canvas.getContext("2d");
    screenWidth = self.innerWidth;
    screenHeight = self.innerHeight;

    canvas.width = screenWidth;
    canvas.height = screenHeight;

    camera = new Camera(new Vector3D(0, 0, 0), new Vector3D(0, 0, 1), 
    new Vector3D(0, 1, 0), screenWidth/screenHeight, 90, 5);
    objects.push(new Sphere(new Vector3D(0, 0, 10), 6));
    objects.push(new Sphere(new Vector3D(12, 10, 7), 6));    

    document.addEventListener('mousemove', onMouseMove, false);

    setInterval(update, 10);
})

function update()
{
    ctx.clearRect(0, 0, screenWidth, screenHeight);
    render();
}

function render()
{
    for(let x = 0; x < screenWidth; ++x)
        for(let y = 0; y < screenHeight; ++y)
        {
            let res = rayMarching(camera.position, new Vector3D(x - screenWidth/2, y - screenHeight/2, 1));
            if(res)
            {
                ctx.fillStyle = 'black';
                ctx.fillRect(x, y, 1, 1);
            }
        }
    console.log('Rendered', camera.position);
}

// return true if something's hit by a ray, or false if none
function rayMarching(origin, direction)
{
    let currPoint = Object.create(origin);
    direction.normalize();
    let nearestDist = calculateNearestObjectDistance(currPoint);
    while(nearestDist < 100)
    {
        if(nearestDist < 0.1)
        {
            return true;
        }
        currPoint = currPoint.add(direction.multiplyByNumber(nearestDist));
        nearestDist = calculateNearestObjectDistance(currPoint);
    }
    return false;
}

function calculateNearestObjectDistance(fromPoint)
{  
    let minD = Number.MAX_SAFE_INTEGER;
    objects.forEach(object => {
        if(object.type == 'Sphere')
        {
            let localD = Math.sqrt(
                (object.center.x - fromPoint[0])**2 +
                (object.center.y - fromPoint[1])**2 +
                (object.center.z - fromPoint[2]) **2) - object.radius;
            if(localD < minD)
            {
                minD = localD;
            }
        }
    });

    return minD;
}

function onMouseMove(e)
{
    mouseX = e.pageX;
    mouseY = e.pageY;
}