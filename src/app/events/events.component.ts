import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events/events.service';
import { Event } from '../model/events.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

export class EventsComponent implements OnInit {
  public events: Event[] = [];
  public selectedEvent: Event = new Event();
  public data: any;
  public listEvent: boolean = true;
  public showEventDetail: boolean = false;
  public createEvent: boolean = false;

  constructor(
    private eventsService: EventsService
  ) {}

  ngOnInit() {
    this.eventsService.getEvents().subscribe(data => {
      this.processEventsResults(data);
    });
  }

  private processEventsResults(data: any): void {
    console.log (data);
    this.events = data;
    this.data = data;
  }

  public viewEventDetails(event: Event): void {
    this.eventsService.getEventDetails(event.id).subscribe(data => {
      this.selectedEvent = data;
      this.showEventDetail = true;
      this.listEvent = false;
    });
  }
  public comeBack(): void {
    this.selectedEvent = new Event();
    this.listEvent = true;
    this.showEventDetail = false;
    this.createEvent = false;
  }

  public openCreateEvent(): void {
    this.createEvent = true;
    this.listEvent = false;
  }

    public deleteEvent(event: Event): void {
    Swal.fire({
      title: '¿Está seguro que dese eliminar el evento?',
      text: "No podrá revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.value) {
            this.eventsService.deleteEvent(event.id).subscribe(data => {
              this.selectedEvent = new Event();
              console.log(this.events);
              window.location.reload();
            });
        Swal.fire(
          'Eliminado!',
          'Su evento se ha eliminado con éxito.',
          'success'
        )
      }
    })
    }
}
