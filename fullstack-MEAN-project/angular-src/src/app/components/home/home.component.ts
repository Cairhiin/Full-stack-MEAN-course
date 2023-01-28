import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../book';
import { Rating } from '../../rating';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  booksByDate: Book[] = [];
  booksByRating: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooksByDate('desc', 5);
    this.getBooksByRating('desc', 5);
  }

  getBooksByDate(sort: string, limit: number): void {
    this.bookService.getBooksByDate(sort, limit)
      .subscribe(books => this.booksByDate = books);
  }

  getBooksByRating(sort: string, limit: number): void {
    this.bookService.getBooksByRating(sort, limit)
      .subscribe(books => this.booksByRating = books);
  }
}
