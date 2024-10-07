import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MovieOption } from './models/movie-option.model';
import { MoviesService } from '../services/movies.service';
import { DurationPipe } from '../../shared/pipes/duration.pipe';
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { MoviesFilteringComponent } from '../movies-filtering/movies-filtering.component';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    DurationPipe,
    MoviesFilteringComponent,
  ],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css',
})
export class MoviesListComponent implements OnInit {
  protected readonly movieService = inject(MoviesService);
  private destroy$ = new Subject<void>();
  private readonly router = inject(Router);

  movies: MovieOption[] = [];
  filteredMovies: MovieOption[] = [];
  title: string = '';
  year: string = '';

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
      .subscribe((data: MovieOption[]) => {
        this.movies = data;
        this.filteredMovies = data;
      });
  }

  navigateToDetails(id: string) {
    this.router.navigate(['movies/' + id]);
  }

  applyNewFilteredMovies(newFilteredMovies: MovieOption[]) {
    this.filteredMovies = newFilteredMovies;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
