import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {}

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
