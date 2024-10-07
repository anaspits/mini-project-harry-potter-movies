import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Subject, catchError, of, takeUntil } from 'rxjs';
import { MovieService } from './services/movie.service';
import { MovieDetails } from './models/movie-details.model';
import { DurationPipe } from '../../shared/pipes/duration.pipe';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [ButtonModule, TableModule, DurationPipe],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent {
  movieId: string | null = null;
  protected readonly movieService = inject(MovieService);
  protected readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private destroy$ = new Subject<void>();

  movie: MovieDetails | undefined;

  constructor() {}

  ngOnInit(): void {
    this.movieId = this.route.snapshot.paramMap.get('id');
    if (this.movieId != null) {
      this.fetchMovie();
    }
  }

  fetchMovie(): void {
    this.movieService
      .getMovieDetails(this.movieId ?? '')
      .pipe(
        catchError((error) => {
          return of(undefined);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((data: MovieDetails | undefined) => {
        this.movie = data;
      });
  }

  goBack(): void {
    this.router.navigateByUrl("/");
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
