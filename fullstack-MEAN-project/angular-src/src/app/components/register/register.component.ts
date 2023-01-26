import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  passwordRepeat: string = '';

  constructor(
    private validateService: ValidateService,
    private flashMessageService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  onRegisterSubmit(): boolean {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      passwordRepeat: this.passwordRepeat
    };

    if (!this.validateService.validateRegister(user)) {
      this.flashMessageService.show('Please fill in all fields', 
        { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessageService.show('Please fill in a valid email address', 
        { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    if (!this.validateService.validatePassword(user.password, user.passwordRepeat)) {
      this.flashMessageService.show('Passwords do not match', 
        { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessageService.show('You are now registered', 
        { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      } else {
        this.flashMessageService.show('Something went wrong, failed to register', 
        { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    });

    return true;
  }
}
