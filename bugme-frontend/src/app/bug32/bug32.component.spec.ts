import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BUG32Component } from './bug32.component';

describe('BUG32Component', () => {
  let component: BUG32Component;
  let fixture: ComponentFixture<BUG32Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BUG32Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BUG32Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
