import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationUserRegisterComponent } from './donation-user-register.component';

describe('DonationUserRegisterComponent', () => {
  let component: DonationUserRegisterComponent;
  let fixture: ComponentFixture<DonationUserRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationUserRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationUserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
