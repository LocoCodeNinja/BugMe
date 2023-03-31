import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bug42Component } from './bug42.component';

describe('Bug42Component', () => {
  let component: Bug42Component;
  let fixture: ComponentFixture<Bug42Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Bug42Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bug42Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
