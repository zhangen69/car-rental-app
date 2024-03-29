import { LandingAuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LandingLoginComponent implements OnInit {
  formData = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private authService: LandingAuthService) { }

  ngOnInit() {
  }

  onSubmit(formData) {
    this.authService.login(formData);
  }

}
