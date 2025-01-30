import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalInstitutionProfileComponent } from './animal-institution-profile.component';

describe('AnimalInstitutionProfileComponent', () => {
  let component: AnimalInstitutionProfileComponent;
  let fixture: ComponentFixture<AnimalInstitutionProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalInstitutionProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalInstitutionProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
