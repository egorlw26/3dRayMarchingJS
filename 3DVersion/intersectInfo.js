class IntersectionInfo
{
    #material = null;
    #point = null;
    #minDistance = null;
    #intersectObjectNormal = null;

    constructor(material, point, minDistance, intersectObjectNormal)
    {
        this.#material = material;
        this.#point = point;
        this.#minDistance = minDistance;
        this.#intersectObjectNormal = intersectObjectNormal;
    }

    get material() {return this.#material;}
    set material(material) {this.#material = material;}

    get point() {return this.#point;}
    set point(point) {this.#point = point};

    get minDistance() {return this.#minDistance;}
    set minDistance(distance) {this.#minDistance = distance};

    get intersectObjectNormal() {return this.#intersectObjectNormal;}
    set intersectObjectNormal(normal) {this.#intersectObjectNormal = normal;}
}