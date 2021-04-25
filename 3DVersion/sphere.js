class Sphere{
    #center = new Vector3D();
    #radius = 0;
    constructor(center, radius)
    {
        this.#center = center;
        this.#radius = radius;
    }

    get center()
    {
        return this.#center;
    }

    get radius()
    {
        return this.#radius;
    }

    calculateDistance(toPoint)
    {
        return Math.sqrt(
            (this.center.x - toPoint.x)**2 +
            (this.center.y - toPoint.y)**2 +
            (this.center.z - toPoint.z)**2) - this.radius;
    }
}