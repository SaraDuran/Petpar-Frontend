import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AnimalService } from '../../services/animal.service';
import { AnimalInstitutionRegisterComponent } from './animal-institution-register.component';

describe('AnimalInstitutionRegisterComponent', () => {
  let component: AnimalInstitutionRegisterComponent;
  let fixture: ComponentFixture<AnimalInstitutionRegisterComponent>;
  let animalService: AnimalService;

  beforeEach(async () => {
    // Criando um mock simples para AnimalService
    const animalServiceMock = {
      registerAnimal: jasmine.createSpy().and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      declarations: [ AnimalInstitutionRegisterComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: AnimalService, useValue: animalServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalInstitutionRegisterComponent);
    component = fixture.componentInstance;
    animalService = TestBed.inject(AnimalService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should register an animal', () => {
    const mockAnimalData = { 
      species: 'Cachorro', 
      name: 'Rex', 
      gender: 'M', 
      birthDate: '2020-01-01', 
      adopter: 'João', 
      institution: 'PetPar'
    };

    // Chamando o método de registro e passando os dados simulados
    component.animalData = mockAnimalData;
    component.registerAnimal();

    // Verificando se o método registerAnimal foi chamado com os dados certos
    expect(animalService.registerAnimal).toHaveBeenCalledWith(mockAnimalData);
  });
});
