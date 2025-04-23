import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-movies-list',
  standalone: true,
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    CommonModule
  ]
})
export class MoviesListComponent implements OnInit {
  movies: any[] = [];
  yearFilter: number | null = null;
  winnerFilter: string | null = ''; 
  currentPage = 0;
  totalPages = 0;
  pages: number[] = [];
  visiblePages: number[] = []; 

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    const winnerFilterValue = this.winnerFilter === 'true' ? true : this.winnerFilter === 'false' ? false : undefined;
    const yearFilterValue = this.yearFilter ?? undefined; 

    this.movieService.getMovies(this.currentPage, 10, yearFilterValue, winnerFilterValue)
      .subscribe({
        next: (data: { content: any[]; totalElements: number }) => {
          this.movies = data.content;
          this.totalPages = Math.ceil(data.totalElements / 10);
          this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          this.updateVisiblePages();
        },
        error: (err) => console.error('Error loading movies:', err)
      });
  }

  updateVisiblePages(): void {
    const start = Math.floor(this.currentPage / 5) * 5;
    const end = Math.min(start + 5, this.totalPages);
    this.visiblePages = this.pages.slice(start, end);
  }

  applyFilters(): void {
    this.currentPage = 0;
    this.loadMovies();
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadMovies();
    }
  }

  nextPage(): void {
    if (this.currentPage + 1 < this.totalPages) {
      this.currentPage++;
      this.loadMovies();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadMovies();
  }

  goToFirstPage(): void {
    this.currentPage = 0;
    this.loadMovies();
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages - 1;
    this.loadMovies();
  }

  previousGroup(): void {
    const firstVisiblePage = this.visiblePages[0];
    if (firstVisiblePage > 1) {
      this.currentPage = Math.max(0, firstVisiblePage - 6); 
      this.loadMovies();
    }
  }

  nextGroup(): void {
    const lastVisiblePage = this.visiblePages[this.visiblePages.length - 1];
    if (lastVisiblePage < this.totalPages) {
      this.currentPage = Math.min(this.totalPages - 1, lastVisiblePage); 
      this.loadMovies();
    }
  }
}