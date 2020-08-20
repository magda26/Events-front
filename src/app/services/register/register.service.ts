import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public headers: Headers;
  public environment: any = environment.eventsRestApiHost;

  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append("Content-Type", "application/json");
  }

  register(username: string, email: string, password1: string, first_name: string, last_name: string) {
    return this.http
      .post(this.environment + "/api/create-user/", { username, email, password1, first_name, last_name}, { headers: this.headers })
      .pipe(map(res => res.json()));
  }
}
