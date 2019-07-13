import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicBoxComponent } from './logic-box.component';

describe('LogicBoxComponent', () => {
  let component: LogicBoxComponent;
  let fixture: ComponentFixture<LogicBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
