import { TestBed } from '@angular/core/testing';

import { LogicChoicesService } from './logic-choices.service';

describe('LogicChoicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LogicChoicesService = TestBed.get(LogicChoicesService);
    expect(service).toBeTruthy();
  });
});
