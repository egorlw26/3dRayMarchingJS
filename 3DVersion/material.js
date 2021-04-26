class Material
{
    #color = 'black';
    constructor(color)
    {
        this.#color = color;
    }

    get color() {return this.#color};
}