import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationInstitutionListComponent } from './donation-institution-list.component';

describe('DonationInstitutionListComponent', () => {
  let component: DonationInstitutionListComponent;
  let fixture: ComponentFixture<DonationInstitutionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationInstitutionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationInstitutionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
