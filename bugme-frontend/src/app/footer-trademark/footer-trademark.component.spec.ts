import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterTrademarkComponent } from './footer-trademark.component';

describe('FooterTrademarkComponent', () => {
  let component: FooterTrademarkComponent;
  let fixture: ComponentFixture<FooterTrademarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterTrademarkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterTrademarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
