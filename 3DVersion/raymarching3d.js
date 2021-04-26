let ctx = null;
let objects = [];
let lightSources = [];
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
    new Vector3D(0, 1, 0), screenWidth/screenHeight, 45, 1);

    const redMaterial = new Material(new Color(255, 0, 0, 255), new Vector3D(0.5, 0, 0));
    const greenMaterial = new Material(new Color(0, 255, 0, 255), new Vector3D(0, 0.7, 0));
    const blueMaterial = new Material(new Color(0, 0, 255, 255), new Vector3D(0, 0, 0.6));

    objects.push(new RenderableObject(new Sphere(new Vector3D(0, 0, 0), 0.5), redMaterial));
    objects.push(new RenderableObject(new Sphere(new Vector3D(0, -1, 2), 0.5), greenMaterial));
    objects.push(new RenderableObject(new Sphere(new Vector3D(-3, 3, 0), 0.5), blueMaterial));

    objects.push(new RenderableObject(new Plane(new Vector3D(0, 0, 10), new Vector3D(0, 0, -1)), blueMaterial));

    lightSources.push(new LightSource(new Vector3D(0, 20, 0), 2, new Color(255, 255, 255, 255)));

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
    imageData = ctx.getImageData(0, 0, screenWidth, screenHeight);
    data = imageData.data;
    for(let x = 0; x < screenWidth; ++x)
        for(let y = 0; y < screenHeight; ++y)
        {
            let res = rayMarching(camera.position, 
                camera.getRayDirection((x)/screenWidth, (screenHeight - y)/screenHeight), 100);
            if(res != null)
            {
                let lightNormal = lightSources[0].position.subtract(res.point).getNormalized();
                let diffuseCoef = Math.max(0, lightNormal.dot(res.intersectObjectNormal));
                let resColor = res.material.calculateColor(diffuseCoef);

                let pixelIndex = 4* (y * screenWidth + x);
                data[pixelIndex] = resColor.r;
                data[pixelIndex + 1] = resColor.g;
                data[pixelIndex + 2] = resColor.b;
                data[pixelIndex + 3] = resColor.a;
            }
        }
        ctx.putImageData(imageData, 0, 0);
        console.log("Rendered!");
}

// return true if something's hit by a ray, or false if none
function rayMarching(origin, direction, iterations)
{
    let res = new IntersectionInfo();
    let currPoint = Object.create(origin);
    direction.normalize();
    let nearest = calculateNearest(currPoint);
    for(let i = 0; i < iterations; ++i)
    {
        if(nearest[0] < 0.01)
        {
            res.material = objects[nearest[1]].material;
            res.intersectObjectNormal = objects[nearest[1]].object.getNormal(currPoint);
            res.point = currPoint;
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