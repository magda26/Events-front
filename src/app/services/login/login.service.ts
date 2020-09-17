import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoginService {
  public headers: Headers;
  public environment: any = environment.eventsRestApiHost;
  private authHttpOptions: any;
  readonly TOKEN: string = 'token';

  constructor(private httpClient: HttpClient) {
    this.authHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  public getCurrentToken(): string {
    return sessionStorage.getItem(this.TOKEN);
  }
  public isCurrentUserAuthenticated(): boolean {
    return sessionStorage.getItem(this.TOKEN) != null;
  }
  login(username: string, password: string) {
      return this.httpClient.post(
        this.environment  + '/api/api-auth/',
         { username, password },
        this.authHttpOptions
      );
    }

  public createNewAuthenticatedUser(user: any) {
    sessionStorage.setItem(this.TOKEN, user.token);
    return user;
  }

  logout() {
    let headers = this.getHeaders();
    sessionStorage.removeItem(this.TOKEN);
    return this.httpClient.post(
      this.environment  + '/api/v1/logout/',
      { headers }
    );
  }

  getHeaders(){
    let token = sessionStorage.getItem(this.TOKEN);
    let headers = new HttpHeaders();
    headers  = headers.append('Content-Type', 'application/json');
    if(token != null){
      headers  = headers.append('Authorization', 'Token ' + token);
    }
    return headers;
  }

}
