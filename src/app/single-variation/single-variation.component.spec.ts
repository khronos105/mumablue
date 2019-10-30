import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleVariationComponent } from './single-variation.component';

describe('SingleVariationComponent', () => {
  let component: SingleVariationComponent;
  let fixture: ComponentFixture<SingleVariationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleVariationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleVariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
