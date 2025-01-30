import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAnimalListComponent } from './user-animal-list.component';

describe('UserAnimalListComponent', () => {
  let component: UserAnimalListComponent;
  let fixture: ComponentFixture<UserAnimalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAnimalListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAnimalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
