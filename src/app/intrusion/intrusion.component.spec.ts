import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrusionComponent } from './intrusion.component';

describe('IntrusionComponent', () => {
  let component: IntrusionComponent;
  let fixture: ComponentFixture<IntrusionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntrusionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
