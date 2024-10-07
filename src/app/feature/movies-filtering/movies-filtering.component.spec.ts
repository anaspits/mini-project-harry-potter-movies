import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesFilteringComponent } from './movies-filtering.component';

describe('MoviesFilteringComponent', () => {
  let component: MoviesFilteringComponent;
  let fixture: ComponentFixture<MoviesFilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesFilteringComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviesFilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
