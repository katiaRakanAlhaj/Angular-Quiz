import { ApiServiceComponent } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user/user.model';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailComponent implements OnInit {
  user!: User;
  userNotFound: boolean = false;
  cache: { [id: number]: User } = {}; // Cache object
  loading: boolean = false; // Loading indicator
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiServiceComponent
  ) {}
  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    if (this.cache[userId]) {
      this.user = this.cache[userId];
    } else {
      this.loading = true; // Start loading
      // Simulate a delay of 3 seconds before showing the data
      setTimeout(() => {
        this.apiService.getUser(userId).subscribe(
          (response) => {
            if (response.data) {
              this.user = response.data;
              this.cache[userId] = this.user; // Store fetched data in cache
            } else {
              this.userNotFound = true;
            }
            this.loading = false; // Stop loading
          },
          (error) => {
            console.log(error);
            this.loading = false; // Stop loading
          }
        );
      }, 3000); // Delay duration in milliseconds (e.g., 3000 = 3 seconds)
    }
  }
  goToMainPage(): void {
    this.router.navigate(['/users']);
  }
}
