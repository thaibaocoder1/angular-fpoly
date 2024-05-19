import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { Observable, Subscription } from 'rxjs';

type Data = {
  accessToken: string;
  expireIns: number;
  id: string;
  role: string;
};
interface ApiResponse {
  success: boolean;
  message: string;
  data?: Data;
}
@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent implements OnInit, OnDestroy {
  user!: Data | undefined;
  private subscription: Subscription | undefined;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.subscription = this.store
      .pipe(select((state) => state.users.auth))
      .subscribe((data) => {
        this.user = data?.data;
      });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
