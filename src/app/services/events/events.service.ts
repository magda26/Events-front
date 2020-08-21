import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginService } from '../login/login.service';
import { Event } from '../../model/events.model';


@Injectable({
  providedIn: 'root'
})

export class EventsService {
  public headers: Headers;
  public environment: any = environment.eventsRestApiHost;

  constructor(private http: Http, private authService: LoginService) {}

  public getEvents() {
    this.getHeaders();
    return this.http
      .get(this.environment + '/api/events/',
       {
        headers: this.headers
      })
      .pipe(map(res => res.json()));
  }

  public getEventDetails(id: string) {
    this.getHeaders();
    return this.http
      .get(this.environment + '/api/events/' + id + '/', {
        headers: this.headers
      })
      .pipe(map(res => res.json()));
  }
  public createEvent(event: Event) {
    this.getHeaders();
    return this.http
      .post(this.environment + '/api/events/',
      {
        event_name: event.event_name,
        event_type: event.event_type,
        event_place: event.event_place,
        event_address: event.event_address,
        event_category: event.event_category,
        event_initial_date: event.event_initial_date,
        event_final_date: event.event_final_date
      },
      {headers: this.headers})
      .pipe(map(res => res.json()));
  }

  public editEvent(id: string, event: Event){
    this.getHeaders();
    return this.http
          .put(this.environment + '/api/events/'+ id + '/',
          {
            event_name: event.event_name,
            event_type: event.event_type,
            event_place: event.event_place,
            event_address: event.event_address,
            event_category: event.event_category,
            event_initial_date: event.event_initial_date,
            event_final_date: event.event_final_date,
          },
          {headers: this.headers})
          .pipe(map(res => res.json()));
  }

  public deleteEvent(id: string) {
    this.getHeaders();
    return this.http
      .delete(this.environment + '/api/events/' + id + '/',
      {headers: this.headers})
      .pipe(map(res => res.json()));
  }

  public getHeaders(){
      this.headers = new Headers();
      const userToken = this.authService.getCurrentUser().token;
      const token = 'Token ' + userToken;
      this.headers.append('Authorization', token);
      this.headers.append('Content-Type', 'application/json');
  }
}
