import { Component, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ng-app';
  isAuth = false;
  sidenavOpened = true;
  mobileQuery: MediaQueryList;
  routes = [];

  private _mobileQueryListener: () => void;
  private authListenerSubs: Subscription;

  constructor(
    private authService: AuthService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.isAuth = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuth => {
        this.isAuth = isAuth;
      });
  }

  ngOnInit() {
    this.authService.autoAuthUser();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onLogout() {
    this.authService.logout();
  }
}
