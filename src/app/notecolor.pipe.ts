import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'notecolor'
})
export class NoteColorPipe implements PipeTransform {
    transform(value: number): string {
        if (value < 0 || value > 12) return '';
        return ['note-disabled', 'note-tonic', 
        'note-min-second', 'note-maj-second',
        'note-min-third', 'note-maj-third',
        'note-fourth', 'note-tritone',
        'note-fifth',
        'note-min-sixth', 'note-maj-sixth',
        'note-min-seventh', 'note-maj-seventh'][value];
    }
}