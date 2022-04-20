import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadervisitComponent } from './headervisit.component';

describe('HeadervisitComponent', () => {
  let component: HeadervisitComponent;
  let fixture: ComponentFixture<HeadervisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadervisitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadervisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
