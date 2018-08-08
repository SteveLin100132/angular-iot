import { TestBed, inject } from '@angular/core/testing';

import { DevicesDataService } from './devices-data.service';

describe('DevicesDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DevicesDataService]
    });
  });

  it('should be created', inject([DevicesDataService], (service: DevicesDataService) => {
    expect(service).toBeTruthy();
  }));
});
