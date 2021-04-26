class IntersectionInfo
{
    #material = null;
    #point = null;
    #minDistance = null;

    constructor(material, point, minDistance)
    {
        this.#material = material;
        this.#point = point;
        this.#minDistance = minDistance;
    }

    get material() {return this.#material;}
    set material(material) {this.#material = material;}

    get point() {return this.#point;}
    set point(point) {this.#point = point};

    get minDistance() {return this.#minDistance;}
    set minDistance(distance) {this.#minDistance = distance};
}