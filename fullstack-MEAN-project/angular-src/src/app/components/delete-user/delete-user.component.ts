import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../user';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent {
  @Input() user?: User;
  @Output() onDeleteUser = new EventEmitter<string>();
  @Output() onCancel = new EventEmitter();

  goBack(): void {
    this.onCancel.emit();
  }

  deleteUser(): void {
    this.user && this.onDeleteUser.emit(this.user._id);
  }
}
