import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user/user.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private cache: { [page: number]: User[] } = {};
  constructor(private httpClient: HttpClient) {}
  getUserList(
    page: number
  ): Observable<{ data: User[]; page: number; total_pages: number }> {
    if (this.cache[page]) {
      return of({
        data: this.cache[page],
        page: page,
        total_pages: Object.keys(this.cache).length,
      });
    } else {
      return this.httpClient
        .get<{ data: User[]; page: number; total_pages: number }>(
          `https://reqres.in/api/users?page=${page}`
        )
        .pipe(
          tap((result) => {
            this.cache[page] = result.data;
          })
        );
    }
  }
}
@Injectable({
  providedIn: 'root',
})
export class ApiServiceComponent {
  constructor(private httpClient: HttpClient) {}

  getUser(userId: number) {
    return this.httpClient.get<any>(`https://reqres.in/api/users/${userId}`);
  }
}
