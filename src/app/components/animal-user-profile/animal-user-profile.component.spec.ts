import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalUserProfileComponent } from './animal-user-profile.component';

describe('AnimalUserProfileComponent', () => {
  let component: AnimalUserProfileComponent;
  let fixture: ComponentFixture<AnimalUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalUserProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
