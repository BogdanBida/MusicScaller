import { Pipe, PipeTransform } from '@angular/core';
import { Data } from './models/Data';

@Pipe({
    name: 'notename'
})
export class NoteNamePipe implements PipeTransform {
    transform(value: number): string {
        return Data.NOTES[value % 12];
    }
}