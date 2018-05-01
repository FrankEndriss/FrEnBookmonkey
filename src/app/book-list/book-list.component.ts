
import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Book, Thumbnail } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {
  books: Book[];

  @Output() showDetailsEvent = new EventEmitter<Book>();

  constructor(private bookStoreService: BookStoreService) { }

  ngOnInit() {
    this.books = this.bookStoreService.getAll();
  }

  showDetails(book: Book) {
    this.showDetailsEvent.emit(book);
  }
}

