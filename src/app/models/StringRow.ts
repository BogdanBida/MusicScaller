import { Note } from '../models/Note';

export class StringRow {
    public firstNote: Note;
    private notes: Note[];

    constructor (firstNote: number) {
        this.firstNote = new Note(firstNote);
    }

    private getNote(position: number) {
        return new Note((this.firstNote.getId() + position) % 12);
    }

    public getNotes() {
        this.notes = []
        for (let i = 0; i < 15; i++) {
            this.notes.push(this.getNote(i));
        }
        return this.notes;
    }
}