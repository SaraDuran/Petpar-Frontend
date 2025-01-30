import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalInstitutionRegisterComponent } from './animal-institution-register.component';

describe('AnimalInstitutionRegisterComponent', () => {
  let component: AnimalInstitutionRegisterComponent;
  let fixture: ComponentFixture<AnimalInstitutionRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalInstitutionRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalInstitutionRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
