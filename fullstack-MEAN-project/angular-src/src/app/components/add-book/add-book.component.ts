import { Component, Output, EventEmitter } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { ValidateService } from '../../services/validate.service';
import { GenreService } from '../../services/genre.service';
import { Genre } from '../../genre';
import { Book } from '../../book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {
  @Output() onCancel = new EventEmitter();
  @Output() onAddBook = new EventEmitter<Book>();

  addGenres!: Genre[];
  title: string = '';
  author: string = '';
  description: string = '';
  ISBN: string = '';
  year: string = '';
  publisher: string = '';
  genres!: Genre[];
  fileObj?: File;
  fileUrl: string = '';
  errorMsg: boolean = false;

  constructor(
    private uploadService: UploadService,
    private genreService: GenreService,
    private validateService: ValidateService
  ) {

  }
  
  goBack(): void {
    this.onCancel.emit();
  }

  onFilePicked(event: Event): void {
    this.errorMsg = false;
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.fileObj = file;
  }
  
  onFileUpload() {
    if (!this.fileObj) {
      this.errorMsg = true
      return
    }
    const fileForm = new FormData();
    fileForm.append('file', this.fileObj);
    this.uploadService.fileUpload(fileForm).subscribe(res => {
      this.fileUrl = res['image'];
    });
  }

  onAddBookSubmit() {

  }
}
