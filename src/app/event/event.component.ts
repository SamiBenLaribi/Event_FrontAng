import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Event } from '../models/event.model';
import { EventService } from '../models/event.service';

declare var M: any;

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [EventService]
})
export class EventComponent implements OnInit {

  constructor(public eventService: EventService) { }

  ngOnInit(): void {
    this.resetForm();
    this.refreshEventList();
  }

  resetForm(form?: NgForm){
    if(form)
    form.reset();
    this.eventService.selectedEvent = {
      _id: "",
      title: "",
      description: "",
      date: null,
      address:"",
      image: null
    }
  }

  onSubmit(form : NgForm){
    if(form.value._id == ""){
      this.eventService.postEvent(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEventList();
        M.toast({ html: "Saved Successfuly", classes: "rounded"});
      });
    }else{
      this.eventService.putEvent(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEventList();
        M.toast({ html: "Updated Successfuly", classes: "rounded"});
      });
    }
  }

  refreshEventList(){
    this.eventService.getEventList().subscribe((res) => {
      this.eventService.events = res as Event[];
    });
  }

  onEdit(event: Event){
    this.eventService.selectedEvent = event;
  }

  onDelet(_id: string, form: NgForm){
    if(confirm('Are You sure to delete this record ?') == true){
      this.eventService.deleteEvent(_id).subscribe((res) => {
        this.refreshEventList();
        this.resetForm(form);
        M.toast({ html: 'Deleted Succefully', classes: 'rounded'});
      });
    }
  }

}
