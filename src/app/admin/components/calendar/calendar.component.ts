import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (data) => {
        console.log('Data received:', data);
      }
    });
  }
}