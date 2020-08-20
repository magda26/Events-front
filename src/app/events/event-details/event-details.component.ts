import { Component, OnInit,Input } from '@angular/core';
import { Event } from '../../model/events.model';
import { Category,Type } from '../../model/events.model';
import { EventsService } from '../../services/events/events.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  @Input() event: Event;
  public categories: Category[] =  [{id :"CONFERENCE", name: "Conferencia"}, {id:"CONGRESS", name: "Congreso"},{id :"SEMINAR", name: "Seminario"}, {id:"COURSE", name: "Curso"}]
  public types: Type[] =  [{id :"VIRTUAL", name: "Virtual"}, {id:"PRESENCIAL", name: "Presencial"}]
  eventForm: FormGroup;
  showEditEvent: boolean = false;
  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService
  ) { }

    ngOnInit(): void {
        this.eventForm = this.fb.group({
          event_name: ['', Validators.required],
          event_place: ['', Validators.required],
          event_address: ['', Validators.required],
          event_initial_date: ['', Validators.required],
          event_final_date: ['', Validators.required],
          event_category: ['', Validators.required],
          event_type: ['', Validators.required]
        });
    }
  editEvent(){
    this.eventForm.patchValue({
      event_name: this.event.event_name,
      event_place:this.event.event_place,
      event_address: this.event.event_address,
      event_initial_date: this.event.event_initial_date,
      event_final_date: this.event.event_final_date,
      event_category: this.event.event_category,
      event_type: this.event.event_type
    });
    this.showEditEvent = true;
  }
  onSubmit(): void {
    if ( this.eventForm.invalid ) {
      return;
    }
    this.eventsService.editEvent(this.event.id, this.eventForm.value).subscribe(data => {
      window.location.reload();
    });
  }
  showEventDetail(): void{
  this.showEditEvent=false;
  }
}
