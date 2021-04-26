class RenderableObject
{
    #object = null;
    #material = null;
    constructor(object, material)
    {
        this.#object = object;
        this.#material = material;
    }

    get object() {return this.#object;}
    get material() {return this.#material;}
}