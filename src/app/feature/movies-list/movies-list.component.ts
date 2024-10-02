import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MovieOption } from './models/movie-option.model';
import { MoviesService } from '../services/movies.service';
import { catchError, of, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css'
})
export class MoviesListComponent  implements OnInit {
  protected readonly movieService = inject(MoviesService);
  private destroy$ = new Subject<void>();
   movies: MovieOption[] = [];

  constructor() {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.movieService
    .getMoviesListItams()
    .pipe(
      catchError((error) => {
        return of([]);
      }),
      takeUntil(this.destroy$)
    )
    .subscribe((data) => {
      this.movies = data;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
