import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Subject, of, iif } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { PageLoaderService } from '../page-loader/page-loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListerner = new Subject<boolean>();
  private apiUrl = environment.apiUrl + '/user';
  private loginPagePath = '/admin/auth/login';

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
        this.snackbar.open(res.message, 'Dismiss');
        this.router.navigate([this.loginPagePath]);
      },
      (res: any) => {
        this.snackbar.open(res.error.message, 'Dismiss');
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
        (username === 'admin') && (password === 'admin123'),
        loginSuccessResult,
        loginFailedResult))
    );
    login.subscribe(
      (res: any) => {
        this.pageLoaderService.toggle(false);
        if (res.status === 200) {
          this.isAuth = true;
          const expiresIn = res.expiresIn;
          this.setAuthTimer(expiresIn);
          this.authStatusListerner.next(true);
          const now = new Date();
          const expiration = new Date(now.getTime() + expiresIn);
          this.saveAuthData(expiration);
          this.snackbar.open(res.message, 'Dismiss');
          this.router.navigate(['/']);
        } else if (res.status === 500) {
          this.snackbar.open(res.message, 'Dismiss');
        }
      },
      (res: any) => {
        this.pageLoaderService.toggle(false);
        this.snackbar.open(res.error.message, 'Dismiss');
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
        this.snackbar.open(res.message, 'Dismiss');
        this.router.navigate([this.loginPagePath]);
      },
      (res: any) => {
        this.snackbar.open(res.error.message, 'Dismiss');
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
    this.isAuth = false;
    this.authStatusListerner.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
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
      this.isAuth = true;
      this.setAuthTimer(expiresIn);
      this.authStatusListerner.next(true);
    }
  }

  private setAuthTimer(duration) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration);
  }

  private saveAuthData(expirationDate: Date) {
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const expiration = localStorage.getItem('expiration');
    if (!expiration) {
      return;
    }

    return { expiration: new Date(expiration) };
  }
}
