import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AnimalService } from '../../services/animal.service';
import { AnimalUserProfileComponent } from './animal-user-profile.component';

describe('AnimalUserProfileComponent', () => {
  let component: AnimalUserProfileComponent;
  let fixture: ComponentFixture<AnimalUserProfileComponent>;
  let mockAnimalService: any;
  let mockRoute: any;

  beforeEach(async () => {
    mockAnimalService = {
      getAnimalById: jasmine.createSpy('getAnimalById').and.returnValue(of({ id: '1', name: 'Cachorro' })),
      solicitarAdocao: jasmine.createSpy('solicitarAdocao').and.returnValue(of({}))
    };

    mockRoute = {
      snapshot: { paramMap: { get: () => '1' } }
    };

    await TestBed.configureTestingModule({
      declarations: [AnimalUserProfileComponent],
      providers: [
        { provide: AnimalService, useValue: mockAnimalService },
        { provide: ActivatedRoute, useValue: mockRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve carregar o animal ao iniciar', () => {
    expect(mockAnimalService.getAnimalById).toHaveBeenCalledWith('1');
    expect(component.animal).toEqual({ id: '1', name: 'Cachorro' });
  });

  it('deve solicitar adoção', () => {
    component.animal = { id: '1' };
    component.solicitarAdocao();
    expect(mockAnimalService.solicitarAdocao).toHaveBeenCalledWith('1');
  });
});
