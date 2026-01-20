import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoViaturaGrafico } from './evento-viatura-grafico';

describe('EventoViaturaGrafico', () => {
  let component: EventoViaturaGrafico;
  let fixture: ComponentFixture<EventoViaturaGrafico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventoViaturaGrafico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoViaturaGrafico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
