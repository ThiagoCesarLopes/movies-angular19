import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Para testar serviços HTTP
import { DashboardComponent } from './dashboard.component'; // Importação do componente standalone

describe('DashboardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DashboardComponent, // Adicione o componente standalone aqui
        HttpClientTestingModule // Para testar dependências do MovieService
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
