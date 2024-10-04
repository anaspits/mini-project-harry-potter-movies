import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MovieOption } from './models/movie-option.model';
import { MoviesService } from '../services/movies.service';
import { catchError, of, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [FormsModule, ButtonModule, InputTextModule],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css'
})
export class MoviesListComponent  implements OnInit {
  protected readonly movieService = inject(MoviesService);
  private destroy$ = new Subject<void>();
   movies: MovieOption[] = [];
   filteredMovies: MovieOption[] = [];
   title: string = "";
   year: string = "";

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
      this.filteredMovies = data;
    });
  }

  filterMovies() {
    const titleQuery = this.title.toLowerCase();
    const yearQuery = this.year.toLowerCase();

    this.filteredMovies = this.movies.filter(movie => {
      const matchesTitle = movie.title.toLowerCase().includes(titleQuery);
      const matchesYear = movie.release_date.toLowerCase().includes(yearQuery);

      return (!titleQuery || matchesTitle) && (!yearQuery || matchesYear);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
