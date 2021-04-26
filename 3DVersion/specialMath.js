class Vector3D
{
    constructor(ix, iy, iz)
    {
        this.x = ix;
        this.y = iy;
        this.z = iz;
    }

    copy(vector)
    {
        return new Vector3D(vector.x, vector.y, vector.z);
    }

    add(vector)
    {
        return new Vector3D(
            this.x + vector.x,
            this.y + vector.y,
            this.z + vector.z);
    }

    subtract(vector)
    {
        return new Vector3D(
            this.x - vector.x,
            this.y - vector.y,
            this.z - vector.z);
    }

    dot(vector)
    {
        return this.x * vector.x +
        this.y * vector.y +
        this.z * vector.z;
    }

    get length()
    {
        return Math.sqrt(this.x**2 + this.y**2 + this.z**2);
    }

    normalize()
    {
        let length = this.length;
        this.x /= length;
        this.y /= length;
        this.z /= length;
    }

    getNormalized()
    {
        let length = this.length;
        return new Vector3D (this.x / length, this.y / length, this.z / length);
    }

    cross(vector)
    {
        let res = new Vector3D();
        res.x = this.y * vector.z - this.z * vector.y;
        res.y = this.z * vector.x - this.x * vector.z;
        res.z = this.x * vector.y - this.y * vector.x;
        return res;
    }

    multiply(number)
    {
        return new Vector3D(
            this.x * number,
            this.y * number,
            this.z * number
        );
    }
}

function mClamp(value, min, max) {
    return Math.max(Math.min(value, max), min);
}