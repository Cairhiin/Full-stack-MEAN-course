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
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<any>(this.url).pipe(
      map(({ books }) => books),
      tap(_ => console.log('Retrieved all books')),
      catchError(this.handleError<Book[]>('getHeroes', []))
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
