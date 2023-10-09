import { Component, EventEmitter, Output } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  src: string = '';

  @Output() callbackData: EventEmitter<any> = new EventEmitter();

  callSearch(term: string): void {
    if (term.length >= 3) {
      this.callbackData.emit(term)
      console.log('🔴 Llamamos a nuestra API HTTP GET---> ', term);
    }
  }
}
