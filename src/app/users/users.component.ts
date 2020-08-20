import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RegisterService } from "../services/register/register.service";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { LoginService } from "../services/login/login.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  registerForm: FormGroup;
  show_error = false;
  msj_error = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private registerService: RegisterService,
    private loginService: LoginService
  ) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password1: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required]
    });

    if (this.loginService.isCurrentUserAuthenticated()) {
      this.router.navigate(['']);
    }
  }

  get f() {
    return this.registerForm.controls;
  }

  public onSubmit() {
    this.submitted = true;
    this.show_error = false;

    if (this.registerForm.invalid) {
      return;
    }

    let controls = this.registerForm.controls;
    this.registerService.register(controls.username.value, controls.email.value, controls.password1.value, controls.first_name.value, controls.last_name.value)
      .pipe(first())
      .subscribe(data => {
        this.loginService.createNewAuthenticatedUser(data);
        this.router.navigate(['events']);
      }, err => {
        this.show_error = true;
        this.msj_error = err._body;
        let msj2 = this.msj_error.split('"');
        this.msj_error = msj2[3]
      })
  }
}
