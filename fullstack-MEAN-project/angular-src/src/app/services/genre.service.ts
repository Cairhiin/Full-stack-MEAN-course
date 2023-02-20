import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Genre } from '../genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private url: string = 'http://localhost:3000/genres';
  
  constructor(private http: HttpClient) { }

  getGenres(): Observable<Genre[]> {
    return this.http.get<any>(this.url).pipe(
      map(({ genres }) => genres),
      tap(_ => console.log('Retrieved all genres')),
      catchError(this.handleError<Genre[]>('getGenres', []))
    );
  }

  getGenre(id: string): Observable<Genre> {
    return this.http.get<any>(`${this.url}/${id}`).pipe(
      map(({ genre }) => genre),
      tap(_ => console.log(`Retrieved genre id=${id}`)),
      catchError(this.handleError<Genre>('getGenre'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
