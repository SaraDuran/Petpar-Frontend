import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarInstitutionComponent } from './navbar-institution.component';

describe('NavbarInstitutionComponent', () => {
  let component: NavbarInstitutionComponent;
  let fixture: ComponentFixture<NavbarInstitutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarInstitutionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
