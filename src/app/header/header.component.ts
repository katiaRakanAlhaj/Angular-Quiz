import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../user/user.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  searchQuery: string = '';
  users: User[] = [];
  constructor(private httpClient: HttpClient, private router: Router) {}
  ngOnInit(): void {}
  searchUsers() {
    if (this.searchQuery.trim() !== '') {
      console.log('Search query:', this.searchQuery); // Log the search query
      this.httpClient
        .get<{ data: User[] }>(
          `https://reqres.in/api/users?search=${this.searchQuery}`
        )
        .subscribe((response) => {
          if (response.data) {
            this.users = response.data;
            if (this.users.length > 0) {
              const user = this.users.find(
                (user) => user.first_name === this.searchQuery
              );

              if (user) {
                const userId = user.id;
                this.router.navigate(['/users', userId]);
              } else {
                this.router.navigate(['/users']);
              }
            } else {
              this.router.navigate(['/users']);
            }
          } else {
            this.users = [];
          }
        });
    } else {
      this.users = [];
      this.router.navigate(['/users']); // Navigate to the user list page when the search query is empty
    }
  }
}
