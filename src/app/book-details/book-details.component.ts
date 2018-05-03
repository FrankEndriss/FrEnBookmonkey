
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { BookFactory } from '../shared/book-factory';

@Component({
  selector: 'bm-book-details', // NOTE Selektor ist eigentlich überflüssig, da die Komponente nur übers Routing referenziert wird
  templateUrl: './book-details.component.html',
})
export class BookDetailsComponent implements OnInit {
  book: Book;

  constructor(
    private bookStoreService: BookStoreService,
    private route: ActivatedRoute,
    private router: Router) {
      // init to "emtpy" data as a hack to not get NPEs.
      this.book = BookFactory.empty();
    }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.bookStoreService
      .getSingle(params['isbn'])
      .subscribe(data => this.book = data);
  }

  getRating(num: number) {
    return new Array(num);
  }

  removeBook(event: any) {
    console.log(event);
    if (confirm('Buch wirklich löschen?')) {
      this.bookStoreService.remove(this.book.isbn)
        .subscribe(res => this.router.navigate(['../'], { relativeTo: this.route }));
    }
  }
}
