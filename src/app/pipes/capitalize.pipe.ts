import { Pipe, PipeTransform } from '@angular/core';

/*
    Thanks to http://karlclement.com/blog/dev/angular2/2016/04/10/capitalize-pipe-angular2/
    for this capitalize pipe!
*/

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {
    transform(value: any) {
        if (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
    }
}
