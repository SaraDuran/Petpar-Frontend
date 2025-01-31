import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AnimalService } from '../../services/animal.service';
import { InstitutionAnimalRegisterComponent } from './institution-animal-register.component';

describe('InstitutionAnimalRegisterComponent', () => {
  let component: InstitutionAnimalRegisterComponent;
  let fixture: ComponentFixture<InstitutionAnimalRegisterComponent>;
  let animalService: AnimalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstitutionAnimalRegisterComponent],
      imports: [
        HttpClientTestingModule,  // Simula as requisições HTTP
        FormsModule,
      ],
      providers: [AnimalService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionAnimalRegisterComponent);
    component = fixture.componentInstance;
    animalService = TestBed.inject(AnimalService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call onFileChange when a file is selected', () => {
    const fileInput = { target: { files: [new File([''], 'photo.jpg')] } };
    component.onFileChange(fileInput as any);  // Casting como `any` para evitar o erro de tipo
    expect(component.photo).toBeTruthy();
    expect(component.photoUrl).toContain('blob:');
  });

  it('should register animal successfully', () => {
    const animalData = { type: 'Dog', id: '1', user: { id: '1' }, institution: { id: '1' }, birthDate: '2023-01-01', gender: 'Male', statusAdoption: 'Available', photo: null };

    spyOn(animalService, 'registerAnimal').and.returnValue(of({ message: 'Animal registrado com sucesso' }));

    component.onSubmit();

    expect(animalService.registerAnimal).toHaveBeenCalledWith(animalData);
  });

  it('should handle error when registration fails', () => {
    const animalData = { type: 'Dog', id: '1', user: { id: '1' }, institution: { id: '1' }, birthDate: '2023-01-01', gender: 'Male', statusAdoption: 'Available', photo: null };

    spyOn(animalService, 'registerAnimal').and.returnValue(throwError({ error: 'Erro ao registrar animal' }));
    spyOn(window, 'alert');

    component.onSubmit();

    expect(animalService.registerAnimal).toHaveBeenCalledWith(animalData);
    expect(window.alert).toHaveBeenCalledWith('Erro ao cadastrar. Tente novamente.');
  });
});
