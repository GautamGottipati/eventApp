import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {

  constructor(
    private router:Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  callthis(){
    // alert("Page not yet made")
    this.router.navigate(['event']);
  }

}
