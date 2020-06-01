import { Component, OnInit ,EventEmitter, Output } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() public childEvent = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  callSignup(){
    // alert("You just called me");
    // console.log(DashboardComponent);
    this.childEvent.emit("flex");
    // console.log("Sent flex");
  }

}
