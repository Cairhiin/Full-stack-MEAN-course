import { Component } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private validateService: ValidateService,
    private flashMessageService: FlashMessagesService,
    private router: Router
  ) {}

  onLoginSubmit(): boolean {
    const user = {
      username: this.username,
      password: this.password
    };

    if (!this.validateService.validateLogin(user)) {
      this.flashMessageService.show('Please fill in all fields', 
        { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessageService.show(data.msg, 
        { cssClass: 'alert-danger', timeout: 5000 });
        this.router.navigate(['/login']);
      }
    });

    return true;
  }
}
