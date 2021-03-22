function vectorProjectionMatrixMultiplication(inputVector, inputProjMatrix)
{
    console.log(inputVector);
    console.log(inputProjMatrix);

    let outputVector = [
     inputVector[0] * inputProjMatrix[0][0] +
     inputVector[1] * inputProjMatrix[1][0] +
     inputVector[2] * inputProjMatrix[2][0] +
     inputProjMatrix[3][0],
     inputVector[0] * inputProjMatrix[0][1] +
     inputVector[1] * inputProjMatrix[1][1] +
     inputVector[2] * inputProjMatrix[2][1] +
     inputProjMatrix[3][1],
     inputVector[0] * inputProjMatrix[0][2] +
     inputVector[1] * inputProjMatrix[1][2] +
     inputVector[2] * inputProjMatrix[2][2] +
     inputProjMatrix[3][2]
    ];

    let w =
     inputVector[0] * inputProjMatrix[0][3] +
     inputVector[1] * inputProjMatrix[1][3] +
     inputVector[2] * inputProjMatrix[2][3] +
     inputProjMatrix[3][3];

     if(w != 0)
     {
         outputVector[0] /= w;
         outputVector[1] /= w;
         outputVector[2] /= w;
     }

     return outputVector;
}

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
        return this;
    }

    cross(vector)
    {
        let res = new Vector3D();
        res.x = this.y * vector.z - this.z * vector.y;
        res.y = this.z * vector.x - this.x * vector.z;
        res.z = this.x * vector.y - this.y * vector.x;
        return res;
    }

    multiplyByNumber(number)
    {
        return new Vector3D(
            this.x * number,
            this.y * number,
            this.z * number
        );
    }
}