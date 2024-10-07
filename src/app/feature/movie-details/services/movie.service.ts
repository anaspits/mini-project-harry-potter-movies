import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MovieDetails } from '../models/movie-details.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = '/movies';

  protected readonly http = inject(HttpClient);

  constructor() { }

  getMovieDetails(id: string): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(this.apiUrl + '/' + id);
  }
}
