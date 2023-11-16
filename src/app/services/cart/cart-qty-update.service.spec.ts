import { TestBed } from '@angular/core/testing';

import { CartQtyUpdateService } from './cart-qty-update.service';

describe('CartQtyUpdateService', () => {
  let service: CartQtyUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartQtyUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
