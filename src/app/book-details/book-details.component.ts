
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'bm-book-details', // NOTE Selektor ist eigentlich überflüssig, da die Komponente nur übers Routing referenziert wird
  templateUrl: './book-details.component.html',
})
export class BookDetailsComponent implements OnInit {
  book: Book;

  constructor(
    private bookStoreService: BookStoreService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.book = this.bookStoreService.getSingle(params['isbn']);
  }

  getRating(num: number) {
    return new Array(num);
  }
}
