import { TestBed, inject } from '@angular/core/testing';

import { TestManagementService } from './test-management.service';

describe('TestManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestManagementService]
    });
  });

  it('should be created', inject([TestManagementService], (service: TestManagementService) => {
    expect(service).toBeTruthy();
  }));
});
