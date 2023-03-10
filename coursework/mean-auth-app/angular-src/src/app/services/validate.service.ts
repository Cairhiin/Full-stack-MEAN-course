import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(user): boolean {
    if (
      user.name == undefined ||
      user.email == undefined ||
      user.username == undefined ||
      user.password == undefined
      ) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email): boolean {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }
}
