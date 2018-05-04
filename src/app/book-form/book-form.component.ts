import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Book } from '../shared/book';
import { BookFactory } from '../shared/book-factory';
import { BookStoreService } from '../shared/book-store.service';
import { BookFormErrorMessages } from '../book-form/book-form-error-messages';

@Component({
  selector: 'bm-book-form',
  templateUrl: './book-form.component.html',
  styles: []
})
export class BookFormComponent implements OnInit {
  @ViewChild('myForm') myForm: NgForm;
  book = BookFactory.empty();
  errors: { [key: string]: string } = { };

  constructor(
    private bookStoreService: BookStoreService
  ) { }

  ngOnInit() {
    this.myForm.statusChanges.subscribe(
      () => this.updateErrorMessages()
    );
  }

  /** Liesst alle Formularfelder aus, und setzt die entsprechenden ErrorMessages. */
  private updateErrorMessages() {
    this.errors = { };
    for (const message of BookFormErrorMessages) {
      const control = this.myForm.form.get(message.forControl);
      if (control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm() {
    this.book.authors = this.myForm.value.authors.split(',');
    this.book.thumbnails = [ this.myForm.value.thumbnail ];

    const book = BookFactory.fromObject(this.book);
    this.bookStoreService.create(book).subscribe(res => {
      this.book = BookFactory.empty();
      this.myForm.reset(BookFactory.empty());
    });
  }

}
