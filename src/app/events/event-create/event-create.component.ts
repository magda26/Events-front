import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category,Type } from '../../model/events.model';
import { EventsService } from '../../services/events/events.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html'
})
export class EventCreateComponent implements OnInit {
  public categories: Category[] =  [{id :"CONFERENCE", name: "Conferencia"}, {id:"CONGRESS", name: "Congreso"},{id :"SEMINAR", name: "Seminario"}, {id:"COURSE", name: "Curso"}]
  public types: Type[] =  [{id :"VIRTUAL", name: "Virtual"}, {id:"PRESENCIAL", name: "Presencial"}]
  eventForm: FormGroup;
  returnUrl: string;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private eventsService: EventsService
  ) {
  }

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

  get f() {
    return this.eventForm.controls;
  }

  onSubmit(): void {
    if ( this.eventForm.invalid ) {
      return;
    }
    this.eventsService.createEvent(this.eventForm.value).subscribe(data => {
      window.location.reload();
    });
   }
}
