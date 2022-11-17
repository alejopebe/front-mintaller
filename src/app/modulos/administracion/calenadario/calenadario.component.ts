import { Component, OnInit } from '@angular/core';
import { CalendarOptions, defineFullCalendarElement } from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Calendar } from '@fullcalendar/core';

defineFullCalendarElement();


@Component({
  selector: 'app-calenadario',
  templateUrl: './calenadario.component.html',
  styleUrls: ['./calenadario.component.scss']
})
export class CalenadarioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }


  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    }
  };

  toggleWeekends() {
    // make a copy while overriding some values
    this.calendarOptions = {
      ...this.calendarOptions,
      weekends: !this.calendarOptions.weekends,
    }
  }


}
