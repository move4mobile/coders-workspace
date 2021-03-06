import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinApplicationButtonComponent } from './join-application-button.component';

describe('JoinApplicationButtonComponent', () => {
  let component: JoinApplicationButtonComponent;
  let fixture: ComponentFixture<JoinApplicationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [HttpClient],
      declarations: [ JoinApplicationButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinApplicationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
