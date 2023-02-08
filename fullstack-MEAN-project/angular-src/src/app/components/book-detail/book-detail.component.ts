import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { Book } from '../../book';
import { User } from '../../user';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  user?: User;
  book!: Book;
  selectedValue: number = 0;
  isDeleteBookActive: boolean  = false;
  isEditBookActive: boolean = false;
  isAddBookActive: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    public authService: AuthService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getBook();
    this.getUser();
  }

  getBook(): void {
    this.route.params.subscribe(
        params => {
            const id = params['id'];
            this.bookService.getBook(id)
        .subscribe(book => this.book = book);
      });
  }

  getUser(): void {
    this.authService.getUserProfile().subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }

  /*
  Get the number of times the book has been rated
  by looping over the keys and summing their values
  */
  getNumberOfRatings(): number {
    let count = 0;
    for (const rating in this.book.ratings) {
      count += this.book.ratings[rating];
    }
    return count;
  }

  /* 
  Get the rating as a percentage score and round to two decimals
  */
  getRatingScorePercentage(rating: number): number {
    if (this.getNumberOfRatings() === 0) return 0;
    return Math.round(rating / this.getNumberOfRatings() * 100);
  }

  /* 
  Check if the user has already rated the book and
  if true assign the rating and set hasBeenRated to true
  to avoid the user from rating the book again
  */
  checkIfBookHasBeenRated(): boolean {
    if (!this.user || !this.book) return false;
    const ISBN: string = this.book.ISBN;
    let hasBeenRated: boolean = false;

    this.user.ratings.forEach(r => {
      if (r.book.ISBN === ISBN) {
        hasBeenRated = true;
        this.selectedValue = r.rating;
      };
    });

    return hasBeenRated;
  }

  /* 
  Receive the rating when the user clicks the rating component
  and update both the book and user document in the database
  then update the current book and user with the return value
  */
  updateRating(value: number): void {
    if (this.user) {
      this.user.ratings.push({ book: this.book, rating: value, date: new Date() });

      // Increment the chosen rating by 1
      this.book.ratings[value]++;
      this.authService.updateUserRatings(this.user, this.book)
        .subscribe(value => {
          this.user = value.user;
          this.book = value.book;
        });
    }
  }

  /* 
  Check if the reader has marked this book as
  currently being read by them
  */
  checkIfUserIsReading(): boolean {
    if (this.user && this.user.reading) {
        return this.user.reading.ISBN === this.book.ISBN;
    }
    return false;
  }

  updateUser(): void {
    if (this.user) {
      this.user.reading = this.book;
      this.authService.updateUser(this.user)
        .subscribe(user => this.user = user);
    }  
  }

  deleteBook(id: string): void {
    this.toggleIsDeleteBookActive();
    if (this.book) {
      this.bookService.deleteBook(this.book.id)
        .subscribe(data => {
          if (data.success === true) {
            this.location.back();
          }
        });
    }
  }

  updateBook(book: Book): void {
    this.toggleIsEditBookActive();
    this.bookService.updateBook(book)
      .subscribe(book => this.book = book);
  }

  addBook(book: Book): void {
    this.toggleIsAddBookActive();
    this.bookService.addBook(book)
      .subscribe(book => this.book = book);
  }

  openDeleteBookDialog(): void {
    this.toggleIsDeleteBookActive();
  }

  toggleIsDeleteBookActive(): void {
    this.isDeleteBookActive = !this.isDeleteBookActive;
  }

  openEditBookDialog(): void {
    this.toggleIsEditBookActive();
  }

  toggleIsEditBookActive(): void {
    this.isEditBookActive = !this.isEditBookActive;
  }

  openAddBookDialog(): void {
    this.toggleIsAddBookActive();
  }

  toggleIsAddBookActive(): void {
    this.isAddBookActive = !this.isAddBookActive;
  }
}
