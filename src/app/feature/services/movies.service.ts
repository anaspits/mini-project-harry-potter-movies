import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MovieOption } from '../movies-list/models/movie-option.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiUrl = '/movies';

  protected readonly http = inject(HttpClient);

  constructor() { }

  getMoviesListItams(): Observable<MovieOption[]> {
    return this.http.get<MovieOption[]>(this.apiUrl);
  }
}
