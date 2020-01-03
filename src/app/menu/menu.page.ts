import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public isLoggedIn: boolean = false;

  pages = [
    {
      title: 'Search',
      url: '/menu/customer-search'
    },
    {
      title: 'Registration',
      url: '/menu/customer-registration'
    },
    {
      title: 'Initial Concent',
      url: '/menu/init-concent'
    },
    {
      title: 'Daily Concent',
      url: '/menu/daily-concent'
    },
    {
      title: 'Daily Update',
      url: '/menu/daily-update'
    },
    {
      title: 'Treatment History',
      url: '/menu/treatment-history'
    }
  ];

  selectedPath = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
  }

  ngOnInit() {
  }

}
