import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { GenreService } from '../../services/genre.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { Book } from '../../book';
import { Genre } from '../../genre';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  @Input() book!: Book;
  @Output() onUpdateBook = new EventEmitter<Book>();
  @Output() onCancel = new EventEmitter();

  addGenres!: Genre[];
  title: string = '';
  author: string = '';
  description: string = '';
  ISBN: string = '';
  year: string = '';
  publisher: string = '';
  genres!: Genre[];

  constructor(
    private flashMessageService: FlashMessagesService,
    private validateService: ValidateService,
    private genreService: GenreService
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
    this.genres = genres || [];
    this.genreService.getGenres()
      .subscribe(genres => this.genres = genres);
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
      genres: this.addGenres
    };

    if (!this.validateService.validateBook(book)) {
      this.flashMessageService.show('Please fill in all required fields', 
        { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    /* 
    Merging the new book object with the original
    */
    this.book = {...this.book, ...book };
    console.log(this.book)
    this.onUpdateBook.emit(this.book);
    return true;
  }
}
