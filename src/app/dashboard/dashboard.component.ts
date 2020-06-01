import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // public modelbg = document.querySelector('.bg-model');
  message = "none";

  
  constructor() {
    // console.log("In const model",this.modelbg);
   }

  ngOnInit(): void {
      // console.log(this.modelbg);
  }

  closeModel(){
    // console.log("In close model",this.modelbg);
    // alert("Will close");
    this.message = "none";
  }

  getDisplay(){
    return this.message;
  }

}
