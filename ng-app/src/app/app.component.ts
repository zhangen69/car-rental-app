import { Component, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { LandingAuthService } from './landing/auth/auth.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ng-app';
  isAuth = false; // for landing pages
  adminIsAuth = false; // for admin panel
  sidenavOpened = true;
  mobileQuery: MediaQueryList;
  routes = [];
  landingRoutes = [
    { name: 'Home', url: '/' },
    { name: 'Car List', url: '/car/list' },
    { name: 'Booking List', url: '/booking/list' },
  ];
  adminPanelRoutes = [
    { name: 'New Car', url: '/admin/car/add' },
    { name: 'Car List', url: '/admin/car/list' },
    { name: 'New Booking', url: '/admin/booking/add' },
    { name: 'Booking List', url: '/admin/booking/list' },
    { name: 'New Customer', url: '/admin/customer/add' },
    { name: 'Customer List', url: '/admin/customer/list' },
  ];

  private _mobileQueryListener: () => void;
  private authListenerSubs: Subscription;

  constructor(
    private landingAuthService: LandingAuthService,
    private authService: AuthService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.adminIsAuth = this.authService.getIsAuth();
    this.authService
      .getAuthStatusListener()
      .subscribe(isAuth => {
        this.adminIsAuth = isAuth;
        if (this.adminIsAuth && this.routes.length === 0) {
          this.routes = this.adminPanelRoutes;
        }
      });
    this.isAuth = this.landingAuthService.getIsAuth();
    this.landingAuthService
      .getAuthStatusListener()
      .subscribe(isAuth => {
        this.isAuth = isAuth;
        if (this.isAuth && this.routes.length === 0) {
          this.routes = this.landingRoutes;
        }
      });
  }

  ngOnInit() {
    this.authService.autoAuthUser();
    this.landingAuthService.autoAuthUser();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onLogout() {
    if (this.isAuth) {
      this.landingAuthService.logout();
    } else if (this.adminIsAuth) {
      this.authService.logout();
    }
    this.routes = [];
  }
}
