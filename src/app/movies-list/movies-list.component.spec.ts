import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importação do módulo de teste para HttpClient
import { RouterTestingModule } from '@angular/router/testing'; // Importação do módulo de teste para rotas
import { MoviesListComponent } from './movies-list.component';

describe('MoviesListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MoviesListComponent, // Componente standalone
        HttpClientTestingModule, // Módulo de teste para HttpClient
        RouterTestingModule // Módulo de teste para rotas
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(MoviesListComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
