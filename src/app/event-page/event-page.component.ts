import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
  image = "../../assets/images/banner-1.jpg";

  display = "none";

  constructor() { }

  ngOnInit(): void {
  }

  toggleRegister(){
    this.display = "flex";
  }

  getDisplay(){
    return this.display;
  }

  close(){
    this.display = "none";
  }

}
