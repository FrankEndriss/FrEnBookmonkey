import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

import { Book } from './book';
import { BookFactory } from './book-factory';

@Injectable()
export class BookStoreService {
  private api = 'https://book-monkey2-api.angular-buch.com';
  private headers: Headers = new Headers();

  constructor(private http: Http) {
    this.headers.append('Content-type', 'application/json');

    /*
    this.books = [
      new Book(
        '9783864903571',
        'Angular',
        ['Johannes Hoppe', 'Danny Koppenhagen', 'Ferdinand Malcher', 'Gregor Woiwode'],
        new Date(2017, 3, 1),
        'Grundlagen, fortgeschrittene Techniken und Best Practices mit TypeScript - ab Angular 4, inklusive NativeScript und Redux',
        5,
        [new Thumbnail('https://ng-buch.de/cover2.jpg', 'Buchcover')],
        'Mit Angular setzen Sie auf ein modernes und modulares...'
      ),
      new Book(
        '9783864901546',
        'AngularJS',
        ['Philipp Tarasiewicz', 'Robin Böhm'],
        new Date(2014, 5, 29),
        'Eine praktische Einführung',
        3,
        [new Thumbnail('https://ng-buch.de/cover1.jpg', 'Buchcover')],
        'Dieses Buch führt Sie anhand eines zusammenhängenden Beispielprojekts...'
      )
    ];
    */
  }

  /** Ein allgemeiner Error-handler */
  private errorHandler(error: Error | any): Observable<any> {
    console.log(error); // DEBUG
    return Observable.throw(error);
  }

  /** Query all Books by searchTerm. */
  getAllSearch(searchTerm: string): Observable<Array<Book>> {
    return this.http
      .get(`${this.api}/books/search/${searchTerm}`)
      .retry(3)
      .map(response => response.json())
      .map(rawBooks => rawBooks.map(rawBook => BookFactory.fromObject(rawBook)))
      .catch(this.errorHandler);
  }

  /** Query all Books. */
  getAll(): Observable<Array<Book>> {
    return this.http
      .get(`${this.api}/books`)
      .retry(3)
      .map(response => response.json())
      .map(rawBooks => rawBooks.map(rawBook => BookFactory.fromObject(rawBook)))
      .catch(this.errorHandler);
  }

  /** Query one Book by ISBN. */
  getSingle(isbn: string): Observable<Book>  {
    return this.http
      .get(`${this.api}/book/${isbn}`)
      .retry(3)
      .map(response => response.json())
      .map(rawBook => BookFactory.fromObject(rawBook))
      .catch(this.errorHandler);
  }

  /** Create a new Book. */
  create(book: Book): Observable<any> {
    return this.http
      .post(`${this.api}/book`, JSON.stringify(book), { headers: this.headers })
      .catch(this.errorHandler);
  }

  /** Update an existing Book. */
  update(book: Book): Observable<any> {
    return this.http
      .put(`${this.api}/book/${book.isbn}`, JSON.stringify(book), { headers: this.headers })
      .catch(this.errorHandler);
  }

  /** Remove a Book. */
  remove(isbn: String): Observable<any> {
    return this.http
      .delete(`${this.api}/book/${isbn}`)
      .catch(this.errorHandler);
  }
}
