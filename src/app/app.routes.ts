import { Routes } from '@angular/router';
import { MoviesListComponent } from './feature/movies-list/movies-list.component';
import { MovieDetailsComponent } from './feature/movie-details/movie-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
  {
    path: 'movies',
    component: MoviesListComponent,
  },
  {
    path: 'movies/:id',
    component: MovieDetailsComponent
  },
  {
    path: '**',
    redirectTo: 'movies',
  },
];
