let ctx = null;
let objects = [];
let lightSources = [];
let screenWidth = 0;
let screenHeight = 0;
let camera = null;
let renderer = null;
let mouseX = 0;
let mouseY = 0;

const normalIterations = 100;
const shadowIterations = 25;
const rayMarchingAccuracy = 0.05

$(document).ready(function()
{
    let canvas = document.getElementById("cnv");
    ctx = canvas.getContext("2d");
    screenWidth = self.innerWidth;
    screenHeight = self.innerHeight;

    canvas.width = screenWidth;
    canvas.height = screenHeight;

    firstSceneSetup();

    document.addEventListener('mousemove', onMouseMove, false);

    setInterval(update, 1);
})

function firstSceneSetup()
{
    camera = new Camera(new Vector3D(0, 1, -10), new Vector3D(0, 0, 1), 
    new Vector3D(0, 1, 0), screenWidth/screenHeight, 45, 1);

    objects.push(new RenderableObject(new Sphere(new Vector3D(0, 0.5, 0), 0.5), blueMaterial));
    objects.push(new RenderableObject(new Sphere(new Vector3D(0, -3, 0), 2), greenMaterial));
    objects.push(new RenderableObject(new Sphere(new Vector3D(-3, 3, 0), 0.5), blueMaterial));

    objects.push(new RenderableObject(new Plane(new Vector3D(-6, 0, 0), new Vector3D(1, 0, 0)), blueMaterial));
    objects.push(new RenderableObject(new Plane(new Vector3D(6, 0, 0), new Vector3D(-1, 0, 0)), blueMaterial));
    objects.push(new RenderableObject(new Plane(new Vector3D(0, 6, 0), new Vector3D(0, -1, 0)), redMaterial));
    objects.push(new RenderableObject(new Plane(new Vector3D(0, -6, 0), new Vector3D(0, 1, 0)), redMaterial));
    objects.push(new RenderableObject(new Plane(new Vector3D(0, 0, 25), new Vector3D(0, 0, -1)), blackMaterial));

    lightSources.push(new LightSource(new Vector3D(0, 5, 0), 10, new Color(255, 255, 255, 255)));
    lightSources.push(new LightSource(new Vector3D(-3, 2, 0), 10, new Color(255, 255, 255, 255)));
}

function update()
{
    ctx.clearRect(0, 0, screenWidth, screenHeight);
    render();
}

function render()
{
    let startTime = (new Date()).getTime();

    imageData = ctx.getImageData(0, 0, screenWidth, screenHeight);
    data = imageData.data;

    for(let x = 0; x < screenWidth; ++x)
        for(let y = 0; y < screenHeight; ++y)
        {
            let resColor = calculatePixelColor(x, y);
            if(resColor != null)
            {
                setPixel(x, y, resColor, data);
            }
        }
        ctx.putImageData(imageData, 0, 0);
        let endTime = (new Date()).getTime();
        console.log((endTime - startTime) / 1000, "seconds for frame");
}

function calculatePixelColor(x, y)
{
    let res = rayMarching(camera.position, 
        camera.getRayDirection(x/screenWidth, (screenHeight - y)/screenHeight), normalIterations);
    if(res != null)
    {
        let diffuseCoef = 0;
        lightSources.forEach(lightSource => 
        {
            let lightNormal = lightSource.position.subtract(res.point).getNormalized();
            let shadowRes = rayMarching(res.point.add(lightNormal), lightNormal, shadowIterations);
            
            if(shadowRes == null || lightNormal.dot(lightSource.position.subtract(shadowRes.point)) < 0)
            {
                let lightCoef = lightSource.calculatePower(res.point);
                diffuseCoef += Math.max(0, lightNormal.dot(res.intersectObjectNormal) * lightCoef);
            }
        });

        diffuseCoef /= lightSources.length;
        let resColor = res.material.calculateColor(diffuseCoef);        
        return resColor;
    }
}

function setPixel(x, y, color, data)
{
    let pixelIndex = 4* (y * screenWidth + x);
    data[pixelIndex] = color.r;
    data[pixelIndex + 1] = color.g;
    data[pixelIndex + 2] = color.b;
    data[pixelIndex + 3] = color.a;
}

function rayMarching(origin, direction, iterations)
{
    let currPoint = Object.create(origin);
    direction.normalize();
    let nearest = calculateNearest(currPoint);
    for(let i = 0; i < iterations; ++i)
    {
        if(nearest[0] < rayMarchingAccuracy)
        {
            let res = new IntersectionInfo();
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