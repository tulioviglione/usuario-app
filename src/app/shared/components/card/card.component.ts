import { Component, Input } from '@angular/core';

@Component({
    selector: 'an-card',
    templateUrl: './card.component.html'
})
export class CardComponent { 
    @Input() title: string = '';
}