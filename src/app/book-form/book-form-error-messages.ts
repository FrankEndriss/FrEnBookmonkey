export class ErrorMessage {
    constructor(
        public forControl: string,
        public forValidator: string,
        public text: string
    ) { }
}

export const BookFormErrorMessages = [
    new ErrorMessage('title', 'required', 'Titel muss angegeben werden.'),
    new ErrorMessage('isbn', 'required', 'ISBN muss angegeben werden.'),
    new ErrorMessage('isbn', 'minlength', 'ISBN Mindestlänge 10 Zeichen.'),
    new ErrorMessage('isbn', 'maxlength', 'ISBN Maximallänge 13 Zeichen.'),
    new ErrorMessage('published', 'required', 'Datum muss angegeben werden.'),
    new ErrorMessage('authors', 'required', 'Autor muss angegeben werden.')
];
