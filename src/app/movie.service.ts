import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Movie {
  id: number;
  title: string;
  year: number;
  winner: boolean;
  studios: string[];
  producers: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = 'https://challenge.outsera.tech/api/movies';

  constructor(private http: HttpClient) {}

  // Get years with multiple winners
  getYearsWithMultipleWinners(): Observable<{ year: number; winnerCount: number }[]> {
    return this.http.get<{ years: { year: number; winnerCount: number }[] }>(
      `${this.baseUrl}?projection=years-with-multiple-winners`
    ).pipe(
      map(response => response.years)
    );
  }

  // Get studios with the most wins
  getStudiosWithMostWins(): Observable<{ studios: { name: string; winCount: number }[] }> {
    return this.http.get<{ studios: { name: string; winCount: number }[] }>(
      `${this.baseUrl}?projection=studios-with-win-count`
    );
  }

  // Get win intervals (max and min)
  getWinIntervals(): Observable<{ max: any[]; min: any[] }> {
    return this.http.get<{ max: any[]; min: any[] }>(
      `${this.baseUrl}?projection=max-min-win-interval-for-producers`
    );
  }

  // Get winners by year
  getWinnersByYear(year: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}?winner=true&year=${year}`);
  }

  // Get movies with pagination, year, and winner filters
  getMovies(page: number, size: number, year?: number, winner?: boolean): Observable<{ content: Movie[]; totalElements: number }> {
    let params = `?page=${page}&size=${size}`;
    if (year !== undefined) params += `&year=${year}`;
    if (winner !== undefined) params += `&winner=${winner}`;
    return this.http.get<{ content: Movie[]; totalElements: number }>(`${this.baseUrl}${params}`);
  }
}