class Material
{
    #color = new Color();
    #diffuse = new Vector3D();
    #ambientCoef = 0.2;
    constructor(color, diffuse)
    {
        this.#color = color;
        this.#diffuse = diffuse;
    }

    get color() {return this.#color};
    get diffuse() {return this.#diffuse}

    calculateColor(diffuseCoef)
    {
        let r = mClamp(this.color.r * (this.#ambientCoef + this.diffuse.x * diffuseCoef), 0, 255);
        let g = mClamp(this.color.g * (this.#ambientCoef + this.diffuse.y * diffuseCoef), 0, 255);
        let b = mClamp(this.color.b * (this.#ambientCoef + this.diffuse.z * diffuseCoef), 0, 255);
        let a = this.color.a;
        return new Color(r, g, b, a);
    }
}