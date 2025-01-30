import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationUserListComponent } from './donation-user-list.component';

describe('DonationUserListComponent', () => {
  let component: DonationUserListComponent;
  let fixture: ComponentFixture<DonationUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationUserListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
