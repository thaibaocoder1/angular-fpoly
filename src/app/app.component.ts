import { Component, AfterViewInit } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  title = 'project-angular-fpoly';
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
