import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username = 'User'
  constructor(private router: Router) { }
  ngOnInit(): void {
  }
  goToProfile() {
    this.router.navigate(['/user-profile']);
  }
  logout() {
    localStorage.removeItem('key');
    this.router.navigate(['/signin']);
  }
  }