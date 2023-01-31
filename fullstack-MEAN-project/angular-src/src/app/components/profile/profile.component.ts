import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: User = {
    _id: '',
    name: '',
    username: '',
    email: '',
    role: '',
    ratings: [],
    reviews: []
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.authService.getUserProfile()
    .subscribe(user => this.user = user);
  }

  getMostRatedGenre(): void {
    for (let book of this.user.ratings) {
      console.log(this.user.ratings);
    }
  }
}
