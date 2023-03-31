import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bug41Component } from './bug41.component';

describe('Bug41Component', () => {
  let component: Bug41Component;
  let fixture: ComponentFixture<Bug41Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bug41Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bug41Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
