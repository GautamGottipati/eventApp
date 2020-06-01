import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
 
@Component({
  selector: 'app-past',
  templateUrl: './past.component.html',
  styleUrls: ['./past.component.css']
})
export class PastComponent implements OnInit {

  constructor(
    private router:Router,
    private route:ActivatedRoute

  ) { }

  ngOnInit(): void {
  }

  callthis(){
    this.router.navigate(['event']);
  }


}
