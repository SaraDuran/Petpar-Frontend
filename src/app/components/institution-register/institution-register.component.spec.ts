import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionRegisterComponent } from './institution-register.component';

describe('InstitutionRegisterComponent', () => {
  let component: InstitutionRegisterComponent;
  let fixture: ComponentFixture<InstitutionRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutionRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutionRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
