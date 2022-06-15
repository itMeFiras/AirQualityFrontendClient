import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqmarkerComponent } from './reqmarker.component';

describe('ReqmarkerComponent', () => {
  let component: ReqmarkerComponent;
  let fixture: ComponentFixture<ReqmarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReqmarkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqmarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
