import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPageTestComponent } from './product-page-test.component';

describe('ProductPageTestComponent', () => {
  let component: ProductPageTestComponent;
  let fixture: ComponentFixture<ProductPageTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPageTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPageTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
