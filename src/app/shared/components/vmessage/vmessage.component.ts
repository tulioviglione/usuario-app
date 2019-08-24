import { Component, Input } from '@angular/core';

@Component({
    selector: 'an-vmessage',
    templateUrl: './vmessage.component.html'
})
export class VMessageComponent { 

    @Input() text = '';

}