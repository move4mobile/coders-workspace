import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesCountComponent } from './badges-count.component';

describe('BadgesCountComponent', () => {
  let component: BadgesCountComponent;
  let fixture: ComponentFixture<BadgesCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgesCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgesCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
