import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken?: string | null;
  user?: User | null;

  private authUrl: string = 'http://localhost:3000/users';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  registerUser(
    user:
    { 
      name: string, 
      username: string, 
      email: string, 
      password: string 
    }
  ): Observable<any> {
    const url = `${this.authUrl}/register`;
    return this.http.post<any>(url, user, this.httpOptions).pipe(
      tap((data: any) => console.log(data.msg)),
      catchError(this.handlerError<any>('registerUser'))
    );
  }

  authenticateUser(
    user:
    {
      username: string,
      password: string
    }
  ): Observable<any> {
    const url = `${this.authUrl}/authenticate`;
    return this.http.post<any>(url, user, this.httpOptions).pipe(
      tap((data: any) => console.log(data.msg)),
      catchError(this.handlerError<any>('authenticateUser'))
    );  
  }

  private handlerError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

  storeUserData(token: string, user: User): void {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(): void {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
