import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../user';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {
  @Input() book_id?: string;
  @Input() user?: User;
  @Input() isActive: boolean = true; 
  @Input() selectedValue?: number;
  @Output() onRatingChange = new EventEmitter<number>();

  stars: number[] = [1, 2, 3, 4, 5];

  /* Solution: https://stackoverflow.com/questions/55092949/angular-star-rating */
  getStar(star: number): void {
    if (this.isActive) {
      this.selectedValue = star;
      this.isActive = false;
      this.onRatingChange.emit(star);
    }
  }
}


