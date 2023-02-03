import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { 
  debounceTime, distinctUntilChanged, switchMap 
} from 'rxjs/operators';
import { BookService } from '../../services/book.service';
import { Book } from '../../book';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent {
  books$!: Observable<Book[]>;
  isInFocus: boolean = false;
  private searchTerms = new Subject<string>();

  constructor(private bookService: BookService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  toggleFocus() {
    this.isInFocus = !this.isInFocus;
  }

  ngOnInit(): void {
    this.books$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.bookService.searchBooks(term)),
    );
  }
}
