import { Component, AfterViewInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import $ from 'jquery';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  isRoot: boolean = true;
  isAuth: boolean = true;
  isAdmin: boolean = true;
  title = 'project-angular-fpoly';

  constructor(private router: Router) {}
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/';
        this.isAuth = !this.router.url.includes('/auth');
        this.isAdmin = !this.router.url.includes('/admin');
      }
    });
  }
  ngAfterViewInit(): void {
    this.setupBackToTopButton();
  }
  setupBackToTopButton(): void {
    $(window).on('scroll', function () {
      if ($(this).scrollTop() !== undefined && $(this).scrollTop()! > 100) {
        $('.back-to-top').fadeIn('slow');
      } else {
        $('.back-to-top').fadeOut('slow');
      }
    });

    $('.back-to-top').on('click', function () {
      $('html, body').animate({ scrollTop: 0 }, 500);
    });
  }
}
