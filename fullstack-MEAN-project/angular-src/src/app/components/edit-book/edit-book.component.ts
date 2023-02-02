import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { Book } from '../../book';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  @Input() book!: Book;
  @Output() onUpdateBook = new EventEmitter<Book>();
  @Output() onCancel = new EventEmitter();

  title: string = '';
  author: string = '';
  description: string = '';
  ISBN: string = '';
  year: string = '';
  publisher: string = '';
  genres: string = '';

  constructor(
    private flashMessageService: FlashMessagesService,
    private validateService: ValidateService
  ) {}

  ngOnInit() {
    /* 
    Destructuring and assigning the book data to the variables in order
    to validate the input data and turn the genres array into a comma seperated
    string and back to an array upon a successful submit event
    */
    const { title, author, description, ISBN, year, publisher, genres, ratings, reviews } = this.book;
    this.title = title;
    this.author = author;
    this.description = description;
    this.ISBN = ISBN;
    this.year = year;
    this.publisher = publisher || '';
    this.genres = genres.join(',');
  }

  goBack(): void {
    this.onCancel.emit();
  }

  onEditBookSubmit(): boolean {
    const book = {
      title: this.title,
      author: this.author,
      description: this.description,
      ISBN: this.ISBN,
      year: this.year,
      publisher: this.publisher,
      genres: this.genres
    };

    if (!this.validateService.validateBook(book)) {
      this.flashMessageService.show('Please fill in all required fields', 
        { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    /* 
    Turning the string back into an array (trimming any spaces 
    in case the user inputed a space after the comma) and merging the
    new book object with the original to preserve id, ratings and
    reviews
    */
    const genres = book.genres.split(',');
    this.book = {...book, ...this.book, genres: genres.map(genre => genre.trim()) };
    this.onUpdateBook.emit(this.book);
    return true;
  }
}
