import { Component, OnInit } from '@angular/core';
import { Register } from '../register.model';
import { RegisterService } from '../register.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  reg : Register;
  imageUrl : File|string;
  altname : string;
  allowEdit :string = null;
  eventName:string;
  // eventId :string;

  constructor(public regService:RegisterService, private router:Router ,public route:ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.paramMap.subscribe(paramMap=>{
    //   this.eventId =  paramMap.get('postid');
    //   console.log("Printing event id"this.eventId)
    // })
    this.reg = this.regService.getReg();
    this.imageUrl = this.regService.getImage();
    this.eventName = this.reg.eventName;
    console.log(this.imageUrl);
    this.altname = this.reg.fullname;
    console.log("Printing Registration :",this.reg);
    
  }

  edit(){
    this.allowEdit = "edit";
    const navLink = `/event/${this.reg.eventId}/register/`
    this.router.navigate([navLink,this.allowEdit]);
  }

  save(){
    alert("Hello world");
    console.log("Inside save: ",this.reg)
    this.regService.addReg(this.reg.eventName ,this.reg.eventId,this.reg.fullname,this.reg.mobileno,this.reg.emailid,this.reg.regtype,this.reg.ticketcount,this.reg.idproof);
  }

}
