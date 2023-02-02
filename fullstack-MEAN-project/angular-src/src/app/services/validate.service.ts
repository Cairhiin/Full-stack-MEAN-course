import { Injectable } from '@angular/core';
import { Genre } from '../genre';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateLogin(user: { username: string, password: string }): boolean {
    if (
      user.username === '' ||
      user.password === ''
    ) {
      return false;
  }
  
  return true;
}

  validateRegister(
    user:
    { 
      name: string, 
      username: string, 
      email: string, 
      password: string 
    }
  ): boolean {
    if (
      user.name === '' || 
      user.username === '' ||
      user.email === '' ||
      user.password === ''
    ) {
      return false;
    }
    return true;
  }

  validateEmail(email: string): boolean {
    if (email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) === null) return false;
      return true;
  }

  validatePassword(password: string, passwordRepeat: string): boolean {
    return (password === passwordRepeat);
  }

  validateBook(book: 
    {
      title: string,
      author: string,
      description: string,
      ISBN: string,
      year: string,
      publisher: string,
      genres: Array<Genre>
    }
  ): boolean {
    if (
      book.title === '' ||
      book.author === '' ||
      book.description === '' ||
      book.year === '' ||
      book.publisher === '' ||
      book.genres === undefined
    ) {
      return false;
    }
    return true;
  }
}
