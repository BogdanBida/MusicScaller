import { Data } from './Data';

export class Note {
    private id: number;
    private name: string;

    constructor (id: number) {
        this.id = id;
        this.name = Data.NOTES[this.id % 12];
    }
    public getId(): number {
        return this.id;
    }
    public getName(): string {
        return this.name;
    }
    public getOctave(): number {
        return Math.trunc(this.id / 12);
    }

    public moveTo(delta: number): void {
        this.id -= delta;
        if (this.id < 0) {
            this.id = 11;
        }
        this.name = Data.NOTES[this.id % 12];
    }
}