import { Component } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isRightMenuOpen: boolean = false;
  isLeftMenuOpen: boolean = false;

  constructor(
    public authService: AuthService,
    private flashMessageService: FlashMessagesService,
    private router: Router
  ) {}
  
  onLogoutClick(): boolean {
    this.authService.logoutUser();
    this.flashMessageService.show('You are logged out', 
      {cssClass: 'alert-success', timeout: 3000 }
    );
    this.router.navigate(['/login']);
    return false;
  }

  toggleLeftMenu(isOpen: boolean): void {
    this.isLeftMenuOpen = isOpen;
  }

  toggleRightMenu(isOpen: boolean): void {
    this.isRightMenuOpen = isOpen;
  }
}
