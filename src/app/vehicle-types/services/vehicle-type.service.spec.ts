import { TestBed, inject } from '@angular/core/testing';

import { VehicleTypeService } from './vehicle-type.service';

describe('VehicleTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleTypeService]
    });
  });

  it('should ...', inject([VehicleTypeService], (service: VehicleTypeService) => {
    expect(service).toBeTruthy();
  }));
});
