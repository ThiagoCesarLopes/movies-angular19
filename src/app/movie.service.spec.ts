import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should retrieve movies from the API via GET', () => {
    const mockMovies = { 
      content: [{ 
        id: 1, 
        title: 'Movie 1', 
        year: 2021, 
        winner: false, 
        studios: ['Studio 1'], 
        producers: ['Producer 1'] 
      }], 
      totalElements: 1 
    };

    service.getMovies(0, 10, undefined, false).subscribe((movies) => { // Remova o undefined
      expect(movies).toEqual(mockMovies);
    });

    const req = httpMock.expectOne('https://challenge.outsera.tech/api/movies?page=0&size=10&winner=false');
    expect(req.request.method).toBe('GET');
    req.flush({ content: mockMovies.content, totalElements: mockMovies.totalElements });
  });

  it('should retrieve years with multiple winners', () => {
    const dummyYears = [{ year: 2000, winnerCount: 2 }];

    service.getYearsWithMultipleWinners().subscribe((data) => {
      expect(data).toEqual(dummyYears);
    });

    const req = httpMock.expectOne('https://challenge.outsera.tech/api/movies?projection=years-with-multiple-winners');
    expect(req.request.method).toBe('GET');
    req.flush({ years: dummyYears });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
