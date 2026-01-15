import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaViatura } from './lista-viatura';

describe('ListaViatura', () => {
  let component: ListaViatura;
  let fixture: ComponentFixture<ListaViatura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaViatura]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaViatura);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
