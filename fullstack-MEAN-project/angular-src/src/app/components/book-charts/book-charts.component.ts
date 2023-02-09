import { Component, OnInit } from '@angular/core';
import { GenreService } from '../../services/genre.service';
import { BookService } from '../../services/book.service';
import { Book } from '../../book';
import { Genre } from '../../genre';

@Component({
  selector: 'app-book-charts',
  templateUrl: './book-charts.component.html',
  styleUrls: ['./book-charts.component.scss']
})
export class BookChartsComponent {
  genres?: Genre[];
  books?: Book[];
  filteredBooks?: Book[];

  constructor(
    private genreService: GenreService,
    private bookService: BookService,
  ){}

  ngOnInit() {
    this.getGenres();
    this.getBooks('desc');
  }

  getGenres(): void {
    this.genreService.getGenres()
      .subscribe(genres => this.genres = genres);
  }

  getBooks(sort: string): void {
    this.bookService.getBooksByRating(sort, 0)
      .subscribe(books => {
        this.books = books;
        this.filteredBooks = books;
      });
  }

  filterGenre(name: string): void {
    if (name === '') {
      this.filteredBooks = this.books;
    } else {
      this.filteredBooks = this.books && this.books.filter(book => 
        book.genres.find(genre => genre.name === name)
      );
    }
  }
}
