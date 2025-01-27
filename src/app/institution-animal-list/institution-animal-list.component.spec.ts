import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionAnimalListComponent } from './institution-animal-list.component';

describe('InstitutionAnimalListComponent', () => {
  let component: InstitutionAnimalListComponent;
  let fixture: ComponentFixture<InstitutionAnimalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutionAnimalListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutionAnimalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
