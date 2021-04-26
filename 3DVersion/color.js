class Color
{
    #red = 0;
    #green = 0;
    #blue = 0;
    #alpha = 0;
    
    constructor(red, green, blue, alpha)
    {
        this.#red = red;
        this.#green = green;
        this.#blue = blue;
        this.#alpha = alpha;
    }

    get r() {return this.#red;}
    get g() {return this.#green;}
    get b() {return this.#blue;}
    get a() {return this.#alpha;}
}