import { Routes } from '@angular/router';
import { MoviesListComponent } from './feature/movies-list/movies-list.component';

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
    path: '**',
    redirectTo: 'movies',
  },
];
