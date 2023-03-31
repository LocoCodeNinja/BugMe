import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyProductPageComponent } from './modify-product-page.component';

describe('ModifyProductPageComponent', () => {
  let component: ModifyProductPageComponent;
  let fixture: ComponentFixture<ModifyProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyProductPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
