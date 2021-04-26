class Camera{
    #position = new Vector3D();
    #direction = new Vector3D();
    #upVector = new Vector3D();
    #aspectRatio = 0.0;
    #fov = 0;
    #focusDist = 0;

    constructor(position, direction, upVector, aspectRatio, fov, focusDist)
    {
        this.#position = position;
        this.#direction = direction.getNormalized();
        this.#upVector = upVector.getNormalized();
        this.#aspectRatio = aspectRatio;
        this.#fov = fov;
        this.#focusDist = focusDist;

        const theta = this.#fov * Math.PI / 180;
        const halfHeight = Math.tan(theta/2);
        const halfWidth = halfHeight * this.#aspectRatio;

        this.right = this.#upVector.cross(this.#direction).getNormalized();

        this.corner = this.right.multiply(halfWidth)
            .add(this.#upVector.multiply(halfHeight))
            .subtract(this.#direction.multiply(this.#focusDist));

        this.u = this.right.multiply(halfWidth * 2);
        this.v = this.#upVector.multiply(halfHeight * 2);
    }

    getRayDirection(x, y)
    {
        return this.u.multiply(x)
            .add(this.v.multiply(y))
            .subtract(this.corner);
    }

    get upVector() {return this.#upVector;}
    set upVector(vector) {this.#upVector = vector; }

    get position()
    {
        return this.#position;
    }
}