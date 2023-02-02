import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Book } from '../../book';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent {
  @Input() book!: Book;
  @Output() onDeleteBook = new EventEmitter<string>();
  @Output() onCancel = new EventEmitter();

  goBack(): void {
    this.onCancel.emit();
  }

  deleteBook(): void {
    this.onDeleteBook.emit(this.book.id);
  }
}
