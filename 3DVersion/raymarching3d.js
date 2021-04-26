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

    camera = new Camera(new Vector3D(0, 1, -10), new Vector3D(0, 0, 1), 
    new Vector3D(0, 1, 0), screenWidth/screenHeight, 45, 0.5);

    objects.push(new RenderableObject(new Sphere(new Vector3D(0, 0, 0), 0.5), new Material('red')));
    objects.push(new RenderableObject(new Sphere(new Vector3D(3, -3, 0), 0.5), new Material('green')));
    objects.push(new RenderableObject(new Sphere(new Vector3D(-3, -3, 0), 0.5), new Material('blue')));
    objects.push(new RenderableObject(new Sphere(new Vector3D(3, 3, 0), 0.5), new Material('violet')));
    objects.push(new RenderableObject(new Sphere(new Vector3D(-3, 3, 0), 0.5), new Material('yellow')));

    objects.push(new RenderableObject(new Plane(new Vector3D(0, 1, 0), new Vector3D(0, -5, 0)), new Material('orange')));
    objects.push(new RenderableObject(new Plane(new Vector3D(1, 0, 0), new Vector3D(-5, -5, 0)), new Material('blue')));
    objects.push(new RenderableObject(new Plane(new Vector3D(1, 0, 0), new Vector3D(5, -5, 0)), new Material('yellow')));
    objects.push(new RenderableObject(new Plane(new Vector3D(0, 1, 0), new Vector3D(0, 5, 0)), new Material('orange')));

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
                camera.getRayDirection((x)/screenWidth, (screenHeight - y)/screenHeight));
            if(res != null)
            {
                ctx.fillStyle = res.material.color;
                ctx.fillRect(x, y, 1, 1);
            }
        }
        console.log("Rendered!");
}

// return true if something's hit by a ray, or false if none
function rayMarching(origin, direction)
{
    let res = new IntersectionInfo();
    let currPoint = Object.create(origin);
    direction.normalize();
    let nearest = calculateNearest(currPoint);
    while(currPoint.subtract(origin).length < 100)
    {
        if(nearest[0] < 0.01)
        {
            res.material = objects[nearest[1]].material;
            return res;
        }
        currPoint = currPoint.add(direction.multiply(nearest[0]));
        nearest = calculateNearest(currPoint);
    }
    return null;
}

function calculateNearest(fromPoint)
{  
    let index = null;
    let minD = Number.MAX_VALUE;

    // fromPoint.x = (fromPoint.x % 3 + 3) % 3;
    // fromPoint.y = (fromPoint.y % 3 + 3) % 3;

    for(let i = 0; i < objects.length; ++i)
    {
        let localD = objects[i].object.calculateDistance(fromPoint);
        if(localD < minD)
        {
            minD = localD;
            index = i;
        }
    }
    return [minD, index];
}

function onMouseMove(e)
{
    mouseX = e.pageX;
    mouseY = e.pageY;
}