import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

class MockAuthService {

  checkUser() {}

}

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ {useClass: MockAuthService, provide: AuthService} ],
    imports: [HttpClientModule]
  }));

  const user = [{
    id: 16,
    firstName: 'Yurii',
    lastName: 'Fishchuk',
    email: 'admin@gmail.com',
    password: 'admin'
  }]

  it('should be logged', () => {
    const service: AuthService = TestBed.get(AuthService);
    spyOn(service, 'checkUser').and.returnValue(false);
    expect(service.checkUser(user, 'admin@gmail.com', 'admin')).toBe(false);
  });

  it('should not be logged', () => {
    const service: AuthService = TestBed.get(AuthService);
    spyOn(service, 'checkUser').and.returnValue(true);
    expect(service.checkUser(user, 'admin@gmail.com', 'admin')).toBe(true);
  });
});
