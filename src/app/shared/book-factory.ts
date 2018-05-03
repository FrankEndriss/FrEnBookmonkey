import { Book } from './book';

/** Simple static methods to create Book objects. */
export class BookFactory {
  static empty() {
    return new Book('', '', [''], new Date(), '', 0, [{url: '', title: ''}], '');
  }

  static fromObject(d: any): Book {
    return new Book(
      d.isbn,
      d.title,
      d.authors,
      typeof(d.published) === 'string' ?
        new Date(d.published) : d.published,
      d.subtitle,
      d.rating,
      d.thumbnails,
      d.description
    );
  }
}
