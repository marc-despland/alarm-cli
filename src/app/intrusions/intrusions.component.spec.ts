import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrusionsComponent } from './intrusions.component';

describe('IntrusionsComponent', () => {
  let component: IntrusionsComponent;
  let fixture: ComponentFixture<IntrusionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntrusionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrusionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
