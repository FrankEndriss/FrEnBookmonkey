import { Component } from '@angular/core';
import { Book } from './shared/book';

@Component({
  selector: 'bm-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  listOn = true;
  detailsOn = false;

  book: Book;

  showDetails(pBook: Book) {
    this.book = pBook;
    this.listOn = false;
    this.detailsOn = true;
  }

  showList() {
    this.listOn = true;
    this.detailsOn = false;
  }
}
