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
  books: Book[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
    //this.getBooksByDate('desc', 5);
  }

  getBooksByDate(sort: string, limit: number): void {
    this.bookService.getBooksByDate(sort, limit)
      .subscribe(books => this.books = books);
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books);
  }

  calculateRating(ratings: Rating) {
    let sum: number = 0;
    let count: number = 0;
    for (const value in ratings) {
      sum += Number(value) * ratings[value];
      count += ratings[value];
    }

    return (sum / count).toFixed(2);
  }

}
