class Plane
{
    #normal = new Vector3D();
    #point = new Vector3D();

    constructor(normal, point)
    {
        this.#normal = normal.getNormalized();
        this.#point = point;
    }

    calculateDistance(toPoint)
    {
        let A = this.#normal.x;
        let B = this.#normal.y;
        let C = this.#normal.z;
        return Math.abs(toPoint.subtract(this.#point).dot(this.#normal));
    }
}