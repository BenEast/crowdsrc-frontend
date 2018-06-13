export class Skill {
    name: string;
    rating: number;
    preferred: boolean;

    constructor(name: string, rating?: number, preferred?: boolean) {
        this.name = name;
        this.rating = rating;
        this.preferred = preferred;
    }

    toString() {
        return this.name;
    }
}
