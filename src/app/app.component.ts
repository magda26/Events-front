import { Component } from '@angular/core';
import { LoginService } from "./services/login/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  
  constructor(
    private loginService: LoginService,
    private router: Router) {
  }

  public logout(): void {
    this.loginService.logout();
    this.router.navigate(['/login'])
  }
}
