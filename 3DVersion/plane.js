class Plane
{
    #normal = new Vector3D();
    #point = new Vector3D();

    constructor(point, normal)
    {
        this.#normal = normal.getNormalized();
        this.#point = point;
    }

    calculateDistance(toPoint)
    {
        return Math.abs(toPoint.subtract(this.#point).dot(this.#normal));
    }

    getNormal(_)
    {
        return this.#normal;
    }
}