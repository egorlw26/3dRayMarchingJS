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
}