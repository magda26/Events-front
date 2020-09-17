import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Event } from '../../model/events.model';

@Injectable({
  providedIn: 'root'
})

export class EventsService {
  public headers: Headers;
  readonly TOKEN: string = 'token';
  public environment: any = environment.eventsRestApiHost;

  constructor(private httpClient: HttpClient) {}

  getDesigns(id:string) {
    let headers = this.getHeaders();
    return this.httpClient.get(
                this.environment + "/api/v1/designs/?project="+id,
                { headers }
              );
  }



  public getEvents() {
    let headers = this.getHeaders();
    return this.httpClient.get(
      this.environment + '/api/events/',
      {headers}
    );
  }

  public getEventDetails(id: string) {
    let headers = this.getHeaders();
    return this.httpClient.get(
      this.environment + '/api/events/' + id + '/',
      {headers}
    );
  }
  public createEvent(event: Event) {
    let headers = this.getHeaders();
    return this.httpClient.post(
      this.environment + '/api/events/',
      {
        event_name: event.event_name,
        event_type: event.event_type,
        event_place: event.event_place,
        event_address: event.event_address,
        event_category: event.event_category,
        event_initial_date: event.event_initial_date,
        event_final_date: event.event_final_date
      },
      {headers }
    );
  }

  public editEvent(id: string, event: Event){
    let headers = this.getHeaders();
    return this.httpClient.put(
      this.environment + '/api/events/'+ id + '/',
      {
        event_name: event.event_name,
        event_type: event.event_type,
        event_place: event.event_place,
        event_address: event.event_address,
        event_category: event.event_category,
        event_initial_date: event.event_initial_date,
        event_final_date: event.event_final_date,
      },
      {headers}
    );
  }

  public deleteEvent(id: string) {
    let headers = this.getHeaders();
    return this.httpClient.delete(
      this.environment + '/api/events/' + id + '/',
      {headers}
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
