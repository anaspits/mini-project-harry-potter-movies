import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MovieOption } from './models/movie-option.model';
import { MoviesService } from '../services/movies.service';
import { DurationPipe } from '../../shared/pipes/duration.pipe';
import { catchError, of, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [FormsModule, ButtonModule, InputTextModule, DurationPipe],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.css'
})
export class MoviesListComponent  implements OnInit {
  protected readonly movieService = inject(MoviesService);
  private destroy$ = new Subject<void>();
  private readonly router = inject(Router);

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
    .subscribe((data: MovieOption[]) => {
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

  navigateToDetails(id: string){
    this.router.navigate(['movies/' + id]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
