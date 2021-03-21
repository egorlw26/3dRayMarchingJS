class Camera{
    constructor(position, direction, upVector, aspectRatio, fov, focusDist)
    {
        this.position = position;
        this.direction = direction;
        this.up = upVector;
        this.aspectRatio = aspectRatio;
        this.fov = fov;
        this.focusDist = focusDist;

        const theta = fov * Math.PI / 180;
        const halfWidth = Math.tan(theta/2);
        const halfHeight = halfWidth * this.aspectRatio;

        this.right = this.up.cross(this.direction).normalize();

        this.corner = this.right * halfWidth + this.up * halfHeight - this.direction * this.focusDist;
        this.u = this.right * halfWidth * 2;
        this.v = this.up * halfHeight * 2;
    }
}