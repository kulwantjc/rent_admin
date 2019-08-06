import { TestBed, inject } from '@angular/core/testing';

import { OptionManagementService } from './option-management.service';

describe('OptionManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OptionManagementService]
    });
  });

  it('should be created', inject([OptionManagementService], (service: OptionManagementService) => {
    expect(service).toBeTruthy();
  }));
});
