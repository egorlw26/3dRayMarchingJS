class LightSource
{
    #position = new Vector3D();
    #power = null;
    #color = new Color();

    constructor(position, power, color)
    {
        this.#position = position;
        this.#power = power;
        this.#color = color;
    }

    get position() {return this.#position;}
    get power() {return this.#power;}
    get color() {return this.#color;}

    calculatePower(point)
    {
        if(this.power == 0)
        {
            return 0;
        }
        let distance = point.subtract(this.position).length;
        return (this.power - mClamp(distance, 0, this.power)) / this.power;
    }
}