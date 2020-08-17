import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events/events.service';
import { Event } from '../model/events.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

export class EventsComponent implements OnInit {
  public events: Event[] = [];
  public data: any;

  constructor(
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    this.eventsService.getEvents().subscribe(data => {
      this.processEventsResults(data);
    });
  }


  private processEventsResults(data: any): void {
    this.events = data.results;
    this.data = data;
  }
}
