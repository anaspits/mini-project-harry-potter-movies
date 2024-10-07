import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { MovieOption } from '../movies-list/models/movie-option.model';

@Component({
  selector: 'app-movies-filtering',
  standalone: true,
  imports: [FormsModule, InputNumberModule],
  templateUrl: './movies-filtering.component.html',
  styleUrl: './movies-filtering.component.css',
})
export class MoviesFilteringComponent {
  @Input() title: string = '';
  @Input() year: string = '';
  @Input() filteredMovies: any[] = [];
  @Input() movies: any[] = [];

  @Output() newFilteredMovies: EventEmitter<MovieOption[]> = new EventEmitter<
    MovieOption[]
  >();

  filterMovies() {
    const titleQuery = this.title.toLowerCase();
    const yearQuery = this.year.toString().toLowerCase();

    const filterSubmited = (this.filteredMovies = this.movies.filter(
      (movie) => {
        const matchesTitle = movie.title.toLowerCase().includes(titleQuery);
        const matchesYear = movie.release_date
          .toLowerCase()
          .includes(yearQuery);

        return (!titleQuery || matchesTitle) && (!yearQuery || matchesYear);
      }
    ));
    this.newFilteredMovies.emit(filterSubmited);
  }
}
