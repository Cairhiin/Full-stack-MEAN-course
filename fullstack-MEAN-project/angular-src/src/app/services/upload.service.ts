import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  fileUpload(file: FormData) {
    return this.http.post<any>('http://localhost:3000/upload', file);
  }
}
