import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

interface YearWithMultipleWinners {
  year: number;
  winnerCount: number;
}

interface StudioWithWins {
  name: string;
  winCount: number;
}

interface WinInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

interface WinnerByYear {
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [FormsModule, CommonModule,RouterOutlet],
})
export class DashboardComponent implements OnInit {
  yearsWithMultipleWinners: YearWithMultipleWinners[] = [];
  studiosWithWins: StudioWithWins[] = [];
  maxWinInterval: WinInterval[] = [];
  minWinInterval: WinInterval[] = [];
  winnersByYear: WinnerByYear[] = [];
  selectedYear: number | null = null;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getYearsWithMultipleWinners().subscribe({
      next: (data: YearWithMultipleWinners[]) => {
        this.yearsWithMultipleWinners = data || [];
      },
      error: (err: any) => {
        console.error('Error loading years with multiple winners:', err);
      },
    });

    this.movieService.getStudiosWithMostWins().subscribe({
      next: (data: { studios: StudioWithWins[] }) => {
        this.studiosWithWins = data.studios || [];
      },
      error: (err: any) => {
        console.error('Error loading studios with wins:', err);
      },
    });

    this.movieService.getWinIntervals().subscribe({
      next: (data: { max: WinInterval[]; min: WinInterval[] }) => {
        this.maxWinInterval = data.max || [];
        this.minWinInterval = data.min || [];
      },
      error: (err: any) => {
        console.error('Error loading win intervals:', err);
      },
    });
  }

  searchWinnersByYear(): void {
    if (this.selectedYear) {
      this.movieService.getWinnersByYear(this.selectedYear).subscribe({
        next: (data: WinnerByYear[]) => {
          this.winnersByYear = data || [];
        },
        error: (err: any) => {
          console.error('Error fetching winners by year:', err);
        },
      });
    }
  }
}