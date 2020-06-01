import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  // @Output() public registerEvent = new EventEmitter()

  constructor(
    private router:Router,
    private route :ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  gotoConfirm(){
    alert("Thanks");
    this.router.navigate(['confirm']);
  }



}
