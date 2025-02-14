import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AnimalService } from '../../services/animal.service';
import { UserAnimalAdoptListComponent } from './user-animal-adopt-list.component';

describe('UserAnimalAdoptListComponent', () => {
  let component: UserAnimalAdoptListComponent;
  let fixture: ComponentFixture<UserAnimalAdoptListComponent>;
  let animalService: jasmine.SpyObj<AnimalService>;

  beforeEach(async () => {
    const animalServiceSpy = jasmine.createSpyObj('AnimalService', ['getAnimals', 'reproveAdoption']);

    await TestBed.configureTestingModule({
      declarations: [UserAnimalAdoptListComponent],
      imports: [FormsModule],
      providers: [{ provide: AnimalService, useValue: animalServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(UserAnimalAdoptListComponent);
    component = fixture.componentInstance;
    animalService = TestBed.inject(AnimalService) as jasmine.SpyObj<AnimalService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load animals on init', () => {
    const mockAnimals = [
      { id: '1', species: 'CACHORRO', name: 'Rex', gender: 'M', birthDate: '2020-01-01', institution_id: 1, status_adoption: 'IN_PROGRESS' }
    ];

    animalService.getAnimals.and.returnValue(of(mockAnimals));
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.animals).toEqual(mockAnimals);
    expect(component.filteredAnimals).toEqual(mockAnimals);
  });

  it('should reprove adoption', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const mockAnimalId = 1;
    animalService.reproveAdoption.and.returnValue(of({}));

    component.reproveAdoption(mockAnimalId);
    expect(animalService.reproveAdoption).toHaveBeenCalledWith(mockAnimalId);
  });
});
