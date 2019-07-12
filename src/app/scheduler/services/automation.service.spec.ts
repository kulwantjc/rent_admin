import { TestBed, inject } from '@angular/core/testing';

import { AutomationService } from './automation.service';

describe('AutomationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutomationService]
    });
  });

  it('should ...', inject([AutomationService], (service: AutomationService) => {
    expect(service).toBeTruthy();
  }));
});
