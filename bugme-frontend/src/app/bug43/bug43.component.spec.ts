import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BUG43Component } from './bug43.component';

describe('BUG43Component', () => {
  let component: BUG43Component;
  let fixture: ComponentFixture<BUG43Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BUG43Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BUG43Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
