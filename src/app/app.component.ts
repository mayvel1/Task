import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  showNavbar = true;
  constructor(private router: Router){

  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        // Routes where navbar should not be shown
        const hideNavbarRoutes = ['/signin', '/signup'];

        // Check if the current route is in the list to hide the navbar
        this.showNavbar = !hideNavbarRoutes.includes(this.router.url);
      }
    });
  }
  title = 'training_project';
}
