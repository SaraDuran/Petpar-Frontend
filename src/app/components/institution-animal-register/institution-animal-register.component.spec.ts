import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionAnimalRegisterComponent } from './institution-animal-register.component';

describe('InstitutionAnimalRegisterComponent', () => {
  let component: InstitutionAnimalRegisterComponent;
  let fixture: ComponentFixture<InstitutionAnimalRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutionAnimalRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutionAnimalRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
