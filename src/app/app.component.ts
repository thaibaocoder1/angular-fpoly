import { Component, AfterViewInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  isRoot: boolean = true;
  constructor(private router: Router) {}
  title = 'project-angular-fpoly';
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/';
      }
    });
  }
  ngAfterViewInit(): void {
    this.setupBackToTopButton();
  }
  setupBackToTopButton(): void {
    $(window).scroll(function () {
      if ($(this).scrollTop() !== undefined && $(this).scrollTop()! > 100) {
        $('.back-to-top').fadeIn('slow');
      } else {
        $('.back-to-top').fadeOut('slow');
      }
    });

    $('.back-to-top').click(function () {
      $('html, body').animate({ scrollTop: 0 }, 500);
    });
  }
}
