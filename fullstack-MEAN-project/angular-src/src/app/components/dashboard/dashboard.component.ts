import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
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
      reviews: [], 
  };
  userToBeEdited?: User 

  isDeleteUserActive: boolean  = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.authService.getUserProfile()
    .subscribe(user => {
      this.user = user;
      if (user.role === 'admin') {
        this.authService.getUsers()
        .subscribe(users => this.users = users)
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

  deleteUser(id: string): void {
    this.toggleIsDeleteUserActive();
    if (this.userToBeEdited) {
      this.authService.deleteUser(this.userToBeEdited._id)
        .subscribe(data => { 
          if (this.users && data) {
            this.users = this.users.filter(user => user._id !== id);
          } 
        });
    }
  }

  openDeleteUserDialog(user: User) {
    this.toggleIsDeleteUserActive();
     this.userToBeEdited = user;
  }

  toggleIsDeleteUserActive() {
    this.isDeleteUserActive = !this.isDeleteUserActive;
  }
}