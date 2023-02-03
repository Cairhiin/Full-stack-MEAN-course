import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { GenreService } from '../../services/genre.service';
import { Book } from '../../book';
import { Rating } from '../../rating';
import { Genre } from '../../genre';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  booksByDate!: Book[];
  booksByRating!: Book[];
  genres!: Genre[];

  constructor(
    private bookService: BookService,
    private genreService: GenreService
    ) {}

  ngOnInit(): void {
    this.getBooksByDate('desc', 5);
    this.getBooksByRating('desc', 5);
    this.getGenres();
  }

  getBooksByDate(sort: string, limit: number): void {
    this.bookService.getBooksByDate(sort, limit)
      .subscribe(books => this.booksByDate = books);
  }

  getBooksByRating(sort: string, limit: number): void {
    this.bookService.getBooksByRating(sort, limit)
      .subscribe(books => this.booksByRating = books);
  }

  getGenres(): void {
    this.genreService.getGenres()
      .subscribe(genres => this.genres = genres);
  }
}
