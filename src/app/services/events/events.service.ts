import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginService } from '../login/login.service';


@Injectable({
  providedIn: 'root'
})

export class EventsService {
  public headers: Headers;
  public environment: any = environment.eventsRestApiHost;

  constructor(private http: Http, private authService: LoginService) {
    this.headers = new Headers();
    const userKey = authService.getCurrentUser().key;
    const key = 'Token ' + userKey;
    this.headers.append('Authorization', key);
    this.headers.append('Content-Type', 'application/json');
  }

  public getEvents() {
    return this.http
      .get(this.environment + '/api/events/', {
        headers: this.headers
      })
      .pipe(map(res => res.json()));
  }

  public getEventDetails(id: string) {
    return this.http
      .get(this.environment + '/api/events/' + id + '/', {
        headers: this.headers
      })
      .pipe(map(res => res.json()));
  }
}
