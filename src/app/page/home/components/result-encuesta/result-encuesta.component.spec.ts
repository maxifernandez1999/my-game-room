import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultEncuestaComponent } from './result-encuesta.component';

describe('ResultEncuestaComponent', () => {
  let component: ResultEncuestaComponent;
  let fixture: ComponentFixture<ResultEncuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultEncuestaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
