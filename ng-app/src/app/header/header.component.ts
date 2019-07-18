import { LandingAuthService } from '../landing/auth/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  @Output() navToggle = new EventEmitter<any>();
  isAuth = false;
  adminIsAuth = false;
  constructor(private authService: AuthService, private landingAuthService: LandingAuthService) { }

  ngOnInit() {
    this.isAuth = this.landingAuthService.getIsAuth();
    this.landingAuthService.getAuthStatusListener().subscribe(isAuth => {
      this.isAuth = isAuth;
    });
    this.adminIsAuth = this.authService.getIsAuth();
    this.authService.getAuthStatusListener().subscribe(isAuth => {
      this.adminIsAuth = isAuth;
    });
  }
}
