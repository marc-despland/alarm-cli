import { TestBed, inject } from '@angular/core/testing';

import { AlarmmgtService } from './alarmmgt.service';

describe('AlarmmgtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlarmmgtService]
    });
  });

  it('should be created', inject([AlarmmgtService], (service: AlarmmgtService) => {
    expect(service).toBeTruthy();
  }));
});
