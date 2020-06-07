import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { mimeType } from '../event-create/mime-type.validator';
import { RegisterService } from '../register.service';
import { Register } from '../register.model';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  // @Output() public registerEvent = new EventEmitter()

  form : FormGroup;
  regtypeSelect = '';
  self :boolean = false;
  mode :string ='create';
  imagepreview: string;
  eventId :string;
  myevent ;
  
  constructor(
    private router:Router,
    private route :ActivatedRoute,
    public regService:RegisterService,
    private eventService: EventsService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'fullname':new FormControl(null, {validators:[Validators.required]}),
      'mobileNo': new FormControl(null,{validators:[Validators.required]}),
      'emailid': new FormControl(null,{validators:[Validators.required]}),
      'regtype': new FormControl(null,{validators:[Validators.required]}),
      'totalticket': new FormControl(null,{validators:[Validators.required]}),
      'image':new FormControl(null,{validators:[Validators.required], asyncValidators:[mimeType]})
  });
  this.route.paramMap.subscribe(paramMap=>{
      if(paramMap.has('edit')){
        this.eventId = paramMap.get('postid');
      console.log("Printing paramMap = ",paramMap);
      this.mode = "edit";
      const data = this.regService.getReg();
      this.form.setValue({
        'fullname':data.fullname,
        'mobileNo': data.mobileno,
        'emailid': data.emailid,
        'regtype': data.regtype,
        'totalticket': data.ticketcount,
        'image':data.idproof
        
      }) 


    }else{
      console.log("not in edit");
      this.mode = "create"
      this.eventId = paramMap.get('postid');
      this.eventService.getPost(this.eventId).subscribe(event=>{
        this.myevent = event;
      })
    }
  })
}
  
register(){
  alert("came");
  if(this.form.invalid){
    alert("invalid form");
    return;
  }
  if(this.form.value.totalticket === null || this.form.value.regtype==="self"){
    this.form.value.totalticket = 1
  }
  console.log("Hello",this.form);
  this.self=false;
  this.regService.setReg(this.myevent.title, this.eventId,this.form.value.fullname , this.form.value.mobileNo ,this.form.value.emailid  ,
    this.form.value.regtype ,this.form.value.totalticket ,this.form.value.image );
  this.form.reset();
  this.router.navigate(['confirm']);
}

  gotoConfirm(){
    alert("Thanks");
    this.router.navigate(['confirm']);
  }

  changeSelect(){
    // alert("came");
    console.log(this.regtypeSelect);
    if(this.regtypeSelect === "self"){
      this.self = true;
      this.form.value.totalticket = 1;
    }else{
      this.self= false;
    }
  }

  onImagePicked(event: Event){
    alert("Came here onImagePicked");
    const file = (event.target as HTMLInputElement).files[0];
    console.log("Hello filesra ",file);
    this.form.patchValue({'image':file});
    this.form.get('image').updateValueAndValidity();
    console.log("file",file);
    console.log("form",this.form);
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagepreview = reader.result as string;
      this.regService.setImage(this.imagepreview);
    };
    reader.readAsDataURL(file);
  }

}

// fullname : string;
//     mobileno : string;
//     emailid  : string;
//     regtype  : string;
//     ticketcount : number;
//     idproof  : File | string;