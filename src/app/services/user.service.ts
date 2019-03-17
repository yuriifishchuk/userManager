import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../classes/user';

@Injectable()
export class UserService {

  private url = 'https://5c8cca9f35643b00149388e8.mockapi.io/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
