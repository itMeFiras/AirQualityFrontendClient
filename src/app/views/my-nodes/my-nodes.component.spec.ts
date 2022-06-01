import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNodesComponent } from './my-nodes.component';

describe('MyNodesComponent', () => {
  let component: MyNodesComponent;
  let fixture: ComponentFixture<MyNodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyNodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
