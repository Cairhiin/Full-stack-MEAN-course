import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { ValidateService } from '../../services/validate.service';
import { GenreService } from '../../services/genre.service';
import { FlashMessagesService } from 'flash-messages-angular';
import { Genre } from '../../genre';
import { Book } from '../../book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {
  @Output() onCancel = new EventEmitter();
  @Output() onAddBook = new EventEmitter();

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
    private validateService: ValidateService,
    private flashMessageService: FlashMessagesService
  ) {}
  
  ngOnInit() {
    this.genreService.getGenres()
      .subscribe(genres => this.genres = genres);
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
      this.fileUrl = res.file;
    });
  }

  onAddBookSubmit(): boolean {
    console.log(this.fileUrl);
    const book = {
      title: this.title,
      author: this.author,
      image: `https://book-app-bucket.s3.eu-central-1.amazonaws.com/${this.fileUrl}`,
      description: this.description,
      ISBN: this.ISBN,
      year: this.year,
      publisher: this.publisher,
      genres: this.addGenres
    };

    if (!this.validateService.validateBook(book)) {
      this.flashMessageService.show('Please fill in all required fields', 
        { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    this.onAddBook.emit(book);
    return true;
  }
}
