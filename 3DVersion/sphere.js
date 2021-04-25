class Sphere{
    #center = new Vector3D();
    #radius = 0;
    constructor(center, radius)
    {
        this.type = 'Sphere';
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
}