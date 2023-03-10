import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService  } from '@auth0/angular-jwt';
import { User } from '../user';
import { Book } from '../book';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken?: string | null;
  user?: User | null;

  private authUrl: string = 'users';

  constructor(
    private http: HttpClient,
    public jwtHelperService: JwtHelperService
  ) { }

  registerUser(
    user:
    { 
      name: string, 
      username: string, 
      email: string, 
      password: string,
      ratings: any 
    }
  ): Observable<any> {
    const url = `${this.authUrl}/register`;
    return this.http.post<any>(url, user).pipe(
      tap((data: any) => console.log(data.msg)),
      catchError(this.handleError<any>('registerUser'))
    );
  }

  authenticateUser(user: { username: string, password: string }): Observable<any> {
    const url = `${this.authUrl}/authenticate`;
    return this.http.post<any>(url, user).pipe(
      tap((data: any) => console.log(data.msg)),
      catchError(this.handleError<any>('authenticateUser'))
    );  
  }

  updateUserRatings(user: User, book: Book): Observable<{user: User, book: Book}> {
    return this.http.put<any>(
        `${this.authUrl}/${user._id}/book/${book.id}`, { user, book }).pipe(
      tap(_ => console.log(`updated user id=${user._id} with and book id=${book.id}`)),
      catchError(this.handleError<{user: User, book: Book}>('updateUserRatings'))
    );  
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<any>(`${this.authUrl}/${user._id}`, user).pipe(
      map(({ user }) => user),
      tap(_ => console.log(`updated user id=${user._id}`)),
      catchError(this.handleError<User>('updateUser'))
    );
  }

  getUserProfile(): Observable<User> {
    const url = `${this.authUrl}/profile`;
    this.loadToken();

    return this.http.get<any>(url).pipe(
      map((user) => user),
      tap(_ => console.log(`Retrieved user's profile`)),
      catchError(this.handleError<User>('getUserProfile'))
    );
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.authUrl}/${id}`).pipe(
      tap(_ => console.log(`deleted user id=${id}`)),
      catchError(this.handleError<any>('deleteUser'))
    );
  }

  getUsers(): Observable<User[]> {
    this.loadToken();

    return this.http.get<any>(this.authUrl).pipe(
      map(({ users }) => users),
      tap(_ => console.log(`Retrieved users`)),
      catchError(this.handleError<User[]>('getUserProfile'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
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

  loadToken(): void {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logoutUser(): void {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  isUserloggedIn(): boolean {
    this.loadToken();
    return !this.jwtHelperService.isTokenExpired(this.authToken || '');
  }

  hasAdminRights(role: string) {
    // First check if the user is logged in then check their role
    if (this.isUserloggedIn()) {
      return role === 'admin' || role === 'editor';
    }

    return false;
  }
}
