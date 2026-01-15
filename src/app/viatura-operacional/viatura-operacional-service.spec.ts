import { TestBed } from '@angular/core/testing';

import { ViaturaOperacionalService } from './viatura-operacional-service';

describe('ViaturaOperacionalService', () => {
  let service: ViaturaOperacionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViaturaOperacionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
