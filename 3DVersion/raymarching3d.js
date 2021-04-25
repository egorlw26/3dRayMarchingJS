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

    camera = new Camera(new Vector3D(0, 0, -10), new Vector3D(0, 0, 1), 
    new Vector3D(0, 1, 0), screenWidth/screenHeight, 45, 0.5);

    objects.push(new Sphere(new Vector3D(3, -3, 0), 0.5));    
    objects.push(new Sphere(new Vector3D(0, 0, 0), 0.5));    
    objects.push(new Sphere(new Vector3D(-3, -3, 0), 0.5));    
    objects.push(new Sphere(new Vector3D(3, 3, 0), 0.5));    
    objects.push(new Sphere(new Vector3D(-3, 3, 0), 0.5));    

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
            let res = rayMarching(camera.position, 
                camera.getRayDirection((x)/screenWidth, (y)/screenHeight));
            if(res)
            {
                ctx.fillStyle = 'black';
                ctx.fillRect(x, y, 1, 1);
            }
        }
        console.log("Rendered!");
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
        currPoint = currPoint.add(direction.multiply(nearestDist));
        nearestDist = calculateNearestObjectDistance(currPoint);
    }
    return false;
}

function calculateNearestObjectDistance(fromPoint)
{  
    let minD = Number.MAX_SAFE_INTEGER;
    objects.forEach(object => {
        switch(object.type)
        {
            case "Sphere":
                let localD = Math.sqrt(
                    (object.center.x - fromPoint.x)**2 +
                    (object.center.y - fromPoint.y)**2 +
                    (object.center.z - fromPoint.z)**2) - object.radius;
                if(localD < minD)
                {
                    minD = localD;
                }
                break;
            default:
                break;
        }
    });

    return minD;
}

function onMouseMove(e)
{
    mouseX = e.pageX;
    mouseY = e.pageY;
}