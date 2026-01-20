import { TestBed } from '@angular/core/testing';

import { EventoViaturaService } from './evento-viatura-service';

describe('EventoViaturaService', () => {
  let service: EventoViaturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventoViaturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
