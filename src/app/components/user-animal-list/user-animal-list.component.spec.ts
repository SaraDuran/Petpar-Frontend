import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AnimalService } from '../../services/animal.service';
import { UserAnimalListComponent } from './user-animal-list.component';

describe('UserAnimalListComponent', () => {
  let component: UserAnimalListComponent;
  let fixture: ComponentFixture<UserAnimalListComponent>;
  let animalService: jasmine.SpyObj<AnimalService>;

  beforeEach(async () => {
    const animalServiceSpy = jasmine.createSpyObj('AnimalService', ['getAvailableAnimals', 'requestAdoption']);

    await TestBed.configureTestingModule({
      declarations: [UserAnimalListComponent],
      imports: [FormsModule],
      providers: [
        { provide: AnimalService, useValue: animalServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAnimalListComponent);
    component = fixture.componentInstance;
    animalService = TestBed.inject(AnimalService) as jasmine.SpyObj<AnimalService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load animals on init', () => {
    const mockAnimals = [
      { id: '1', species: 'Cachorro', name: 'Rex', gender: 'M', birthDate: '2020-01-01', location: 'São Paulo' }
    ];

    animalService.getAvailableAnimals.and.returnValue(of(mockAnimals));
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.animals).toEqual(mockAnimals);
    expect(component.filteredAnimals).toEqual(mockAnimals);
  });

  it('should request adoption', () => {
    const mockAnimals = [
      { id: '1', species: 'Cachorro', name: 'Rex', gender: 'M', birthDate: '2020-01-01', location: 'São Paulo' }
    ];
    
    animalService.getAvailableAnimals.and.returnValue(of(mockAnimals));
    animalService.requestAdoption.and.returnValue(of({}));

    component.ngOnInit();
    component.requestAdoption('1');
    fixture.detectChanges();

    expect(animalService.requestAdoption).toHaveBeenCalledWith('1');
  });
});