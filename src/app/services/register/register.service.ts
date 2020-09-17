import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public headers: Headers;
  public environment: any = environment.eventsRestApiHost;
  private authHttpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.authHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
  register(username: string,email: string,  password1: string, first_name: string, last_name: string) {

    return this.httpClient.post(
          this.environment + "/api/create-user/",
          { username, email, password1, first_name, last_name},
          this.authHttpOptions
        );
  }

}
