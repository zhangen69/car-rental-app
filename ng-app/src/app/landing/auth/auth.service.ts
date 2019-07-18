import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Subject, of, iif } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { PageLoaderService } from '../../page-loader/page-loader.service';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LandingAuthService {
  private isAuth = false;
  private token: string;
  private authTimer: any;
  private authStatusListerner = new Subject<boolean>();
  private apiUrl = environment.apiUrl + '/user';
  private loginPagePath = '/auth/login';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private snackbar: MatSnackBar,
    private pageLoaderService: PageLoaderService
  ) { }

  register(formData) {
    this.http.post(this.apiUrl + '/register', formData).subscribe(
      (res: any) => {
        // this.toastr.success(res.message);
        this.snackbar.open(res.message, 'Dismiss');
        this.router.navigate([this.loginPagePath]);
      },
      (res: any) => {
        this.toastr.error(res.error.message);
      }
    );
  }

  login(formData) {
    this.pageLoaderService.toggle(true);

    // mockup data
    const loginSuccessResult = of({ status: 200, message: 'Logged In', expiresIn: 86400000 });
    const loginFailedResult = of({ status: 500, message: 'Username or Password is incorrect.' });
    const login = of(formData).pipe(
      mergeMap(({ username, password }) => iif(() =>
        (username === 'customer') && (password === 'customer123'),
        loginSuccessResult,
        loginFailedResult))
    );
    login.subscribe(
      (res: any) => {
        this.pageLoaderService.toggle(false);
        // this.token = res.token;
        this.isAuth = true;
        // if (this.token) {
        const expiresIn = res.expiresIn;
        this.setAuthTimer(expiresIn);
        this.authStatusListerner.next(true);
        const now = new Date();
        const expiration = new Date(now.getTime() + expiresIn);
        this.saveAuthData(expiration);
        // this.toastr.success(res.message);
        this.snackbar.open(res.message, 'Dismiss');
        this.router.navigate(['/']);
        // }
      },
      (res: any) => {
        this.pageLoaderService.toggle(false);
        this.toastr.error(res.error.message);
      });

    // this.http.post(this.apiUrl + '/login', formData).subscribe(
    //   (res: any) => {
    //     this.pageLoaderService.toggle(false);
    //     this.token = res.token;
    //     this.isAuth = true;
    //     if (this.token) {
    //       const expiresIn = res.expiresIn;
    //       this.setAuthTimer(expiresIn);
    //       this.authStatusListerner.next(true);
    //       const now = new Date();
    //       const expiration = new Date(now.getTime() + expiresIn);
    //       this.saveAuthData(this.token, expiration);
    //       this.toastr.success(res.message);
    //       this.router.navigate(['/']);
    //     }
    //   },
    //   (res: any) => {
    //     this.pageLoaderService.toggle(false);
    //     this.toastr.error(res.error.message);
    //   }
    // );
  }

  forgotPassword(model) {
    return this.http.post(this.apiUrl + '/forgotPassword', model);
  }

  verifyResetPasswordToken(token) {
    return this.http.post(this.apiUrl + '/verifyResetPasswordToken', { token });
  }

  resetPassword(model) {
    this.http.post(this.apiUrl + '/resetPassword', model).subscribe(
      (res: any) => {
        // this.toastr.success(res.message);
        this.snackbar.open(res.message, 'Dismiss');
        this.router.navigate([this.loginPagePath]);
      },
      (res: any) => {
        this.toastr.error(res.error.message);
      }
    );
  }

  getToken() {
    return this.token;
  }

  // getExpiration() {
  //   const expiration = localStorage.getItem('expiration');
  //   return new Date(expiration);
  // }

  getAuthStatusListener() {
    return this.authStatusListerner.asObservable();
  }

  getIsAuth() {
    return this.isAuth;
  }

  logout() {
    // this.token = null;
    this.isAuth = false;
    this.authStatusListerner.next(false);
    clearTimeout(this.authTimer);
    this.clearAuthData();
    // this.toastr.info('Logged Out!');
    this.snackbar.open('Logged Out!', 'Dismiss');
    this.router.navigate(['/']);
  }

  autoAuthUser() {
    const data = this.getAuthData();

    if (!data) {
      return;
    }

    const now = new Date();
    const expiresIn = data.expiration.getTime() - now.getTime();

    if (expiresIn > 0) {
      // this.token = data.token;
      this.isAuth = true;
      this.setAuthTimer(expiresIn);
      this.authStatusListerner.next(true);
    }
  }

  private setAuthTimer(duration) {
    this.authTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  private saveAuthData(expirationDate: Date) {
    // localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    // localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    // const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    if (!expiration) {
      return;
    }

    return { expiration: new Date(expiration) };
  }
}
