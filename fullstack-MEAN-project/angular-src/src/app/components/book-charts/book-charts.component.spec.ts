import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookChartsComponent } from './book-charts.component';

describe('BookChartsComponent', () => {
  let component: BookChartsComponent;
  let fixture: ComponentFixture<BookChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
