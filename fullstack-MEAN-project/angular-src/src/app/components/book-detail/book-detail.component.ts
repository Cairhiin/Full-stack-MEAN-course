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
  book?: Book;
  selectedValue: number = 0;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getBook();
    this.getUser();
  }

  getBook(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.bookService.getBook(id)
      .subscribe(book => this.book = book);
  }

  getUser(): void {
    this.authService.getUserProfile().subscribe(user => {
      this.user = user;
    });
  }

  goBack(): void {
    this.location.back();
  }

  getNumberOfRatings(): number {
    let count = 0;

    if (this.book) {
      for (const rating in this.book.ratings) {
        count += this.book.ratings[rating];
      }
    }
    return count;
  }

  /* 
    Check if the user has already rated the book and
    if true assign the rating and set hasBeenRated to true
    to avoid the user from rating the book again
  */
  checkIfBookHasBeenRated(): boolean {
    if (!this.user || !this.book) return false;
    const id: string = this.book.id;
    let hasBeenRated: boolean = false;

    this.user.ratings.forEach(r => {
      if (r.id === id) {
        hasBeenRated = true;
        this.selectedValue = r.rating;
      };
    });

    return hasBeenRated;
  }

  /* 
  Receive the rating when the user clicks the rating component
  and update both the book and user document in the database
  */
  updateRating(value: number): void {
    if (this.user && this.book) {
      this.user.ratings.push({ id: this.book.id, rating: value });
      this.authService.updateUserRatings(this.user._id || '', this.user)
        .subscribe(user => {
          this.user = user;
          console.log(user.ratings)
        });
    }
  }
}
