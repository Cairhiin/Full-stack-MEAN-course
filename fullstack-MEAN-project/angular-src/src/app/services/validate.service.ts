import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

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
}