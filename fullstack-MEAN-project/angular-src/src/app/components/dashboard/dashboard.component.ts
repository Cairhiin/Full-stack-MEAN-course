import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../user';
import { Rate } from '../../rate';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  users?: User[];
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
    .subscribe(user => {
      this.user = user;
      if (user.role === 'admin') {
        this.authService.getUsers()
        .subscribe(users => this.users = users);
      }
    });
  }

  getRatingsSorted(amount: number, sortBy: string) {
    if (sortBy === 'date') {
      return this.sortRatingsByDate().slice(0, amount);
    }

     return this.sortRatingsByRating().slice(0, amount);
  }


  sortRatingsByDate(): Array<Rate> {
    let ratings = this.user.ratings;
    ratings.sort((a: Rate, b: Rate) => { 
      if(a.date < b.date) return 1;
      if(a.date > b.date) return -1;
      return 0; 
    });
    return ratings;
  }

  sortRatingsByRating(): Array<Rate> {
    let ratings = this.user.ratings;
    ratings.sort((a: Rate, b: Rate) => {
      if (a.rating < b.rating) return 1;
      if (a.rating > b.rating) return -1;
      return 0;
    });
    return ratings;
  }
}