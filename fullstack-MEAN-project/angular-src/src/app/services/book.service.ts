import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Book } from '../book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private url: string = 'http://localhost:3000/books';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<any>(this.url).pipe(
      map(({ books }) => books),
      tap(_ => console.log('Retrieved all books')),
      catchError(this.handleError<Book[]>('getBooks', []))
    );
  }

  getBook(id: string | null): Observable<Book> {
    return this.http.get<any>(`${this.url}/${id}`).pipe(
      map(({ book }) => book),
      tap(_ => console.log(`Book with id=${id} retrieved`)),
      catchError(this.handleError<Book>('getBook'))
    );
  }

  deleteBook(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`).pipe(
      tap(_ => console.log(`deleted book id=${id}`)),
      catchError(this.handleError<any>('deleteBook'))
    );
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<any>(`${this.url}/${book.id}`, book).pipe(
      map(({ book }) => book),
      tap(_ => console.log(`Book with id=${book.id} updated`)),
      catchError(this.handleError<Book>('updateBook'))
    );
  }

  addBook(book: any): Observable<Book> {
    return this.http.post<any>(this.url, book).pipe(
      map(({ book }) => book),
      tap(_ => console.log(`Book with id=${book.id} added`)),
      catchError(this.handleError<Book>('addBook'))
    );  
  }

  getBooksByDate(sort: string, limit: number): Observable<Book[]> {
    return this.http.get<any>(`${this.url}?date=${sort}&limit=${limit}`).pipe(
      map(({ books }) => books),
      tap(_ => console.log(`Retrieved ${limit} books sorted by date`)),
      catchError(this.handleError<Book[]>('getHeroes', []))
    );
  }

  getBooksByRating(sort: string, limit: number): Observable<Book[]> {
    return this.http.get<any>(`${this.url}?rating=${sort}&limit=${limit}`).pipe(
      map(({ books }) => books),
      tap(_ => console.log(`Retrieved ${limit} books sorted by rating`)),
      catchError(this.handleError<Book[]>('getHeroes', []))
    );
  }

  searchBooks(term: string): Observable<Book[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<any>(`${this.url}?title=${term}`).pipe(
      map(({ books }) => books.slice(0, 5)),
      tap(x => x.length ?
        console.log(`Found books matching term ${term}`) :
        console.log(`No books found matching term ${term}`)
      ),
      catchError(this.handleError<Book[]>('searchBooks', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
