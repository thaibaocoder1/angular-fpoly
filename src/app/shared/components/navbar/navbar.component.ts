import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../../app.state';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLogin: boolean = true;
  sub: Subscription | undefined;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.sub = this.store
      .pipe(select((state) => state.users.auth))
      .subscribe((data) => {
        this.isLogin = data?.success ? true : false;
      });
  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
