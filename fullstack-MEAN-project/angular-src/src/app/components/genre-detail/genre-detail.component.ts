import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { GenreService } from '../../services/genre.service';
import { Book } from '../../book';
import { Genre } from '../../genre';

@Component({
  selector: 'app-genre-detail',
  templateUrl: './genre-detail.component.html',
  styleUrls: ['./genre-detail.component.scss']
})
export class GenreDetailComponent implements OnInit {
  genre: Genre = {
    id: '',
    name: '',
    booksInGenre: []
  };
  
  constructor(
    private genreService: GenreService,
    private route: ActivatedRoute,
    private location: Location
  ){}

  ngOnInit(): void {
    this.getGenre();    
  }

  getGenre(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.genreService.getGenre(id)
      .subscribe(genre => this.genre = genre);
  }

}
