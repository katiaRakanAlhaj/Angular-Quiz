import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from './user.model';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  userList: User[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.getUserList();
    window.addEventListener('resize', this.onWindowResize);
  }
  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onWindowResize);
  }
  onWindowResize = () => {
    this.getGridCols();
  };
  getUserList() {
    this.loading = true;
    setTimeout(() => {
      this.userService.getUserList(this.currentPage).subscribe((result) => {
        this.userList = result.data;
        this.currentPage = result.page;
        this.totalPages = result.total_pages;
        this.loading = false;
      });
    }, 3000);
  }
  getGridCols(): number {
    if (window.innerWidth < 640) {
      return 1;
    } else if (window.innerWidth < 960) {
      return 2;
    } else {
      return 3;
    }
  }
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getUserList();
    }
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getUserList();
    }
  }
}
