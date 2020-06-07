import { Component, OnInit ,ElementRef ,ViewChild} from '@angular/core';
import { RegisterService } from 'src/app/register.service';
import { EventsService } from 'src/app/events.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Chart  } from 'chart.js';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
  @ViewChild('piechart') private chartRef;
  chart : any;
  allreg;
  type : string;
  allUser;
  allEvents;
  isLoading = false;
  imgPath = null;
  fullname; mobileno; emailid;regtype; totaltickets;
  display ;
  eventName: any;
  // elementRef: any;
  constructor(private regService : RegisterService , private eventService : EventsService ,
              private authService:AuthService, private router : ActivatedRoute,
              private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.router.paramMap.subscribe(paramMap=>{
      this.type = paramMap.get('type')
    });

    if(this.type === "reg"){
      this.regService.getAllReg().subscribe(regs=>{
        this.allreg = regs.posts;
        console.log("I am in reg",this.allreg);
      })
    }
    if(this.type === "users"){
      this.authService.getAllUsers().subscribe(users=>{
        console.log("Getting users",users);
        this.allUser = users.user;
      })

    }
    if(this.type === "events"){
      this.eventService.getAllPosts().subscribe(event=>{
        this.allEvents = event.posts;
      })
    }

    this.isLoading = false;
  }

  changeImg(imgpath){
    console.log(imgpath);
    this.imgPath =imgpath;
  }

  popup(regnum:string){
    this.regService.getRegByRegName(regnum).subscribe(reg=>{
      console.log(reg);
      this.fullname = reg.post[0].fullname;
      this.mobileno = reg.post[0].mobileno;
      this.emailid = reg.post[0].emailid;
      this.regtype = reg.post[0].regtype;
      this.totaltickets = reg.post[0].totaltickets;
      this.eventName = reg.post[0].eventName;
    })

    // this.display = 'flex';

  }

  closeModel(){
    console.log("Came herer");
    this.display = 'none';
  }

  charts(){
    console.log("Welcome to charts :",this.allreg);
    let selfReg = 0;
    let group = 0;
    let corporate = 0;
    this.allreg.forEach(reg => {
      console.log(reg.regtype);
      let type = reg.regtype; 
      if(type === "self"){
        selfReg = selfReg +1;
      }
      if(type === "group"){
        group = group + 1;
      }
      if(type === "corporate"){
        corporate = corporate + 1;
      }
      
    });

    console.log(selfReg,group,corporate);
    const dataset = [selfReg,group,corporate];
    const labels = ["Self","Group","Corporate"]

    // let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas`);

    this.chart = new Chart(this.chartRef.nativeElement,{
      type : 'pie',
      data : {
        labels: labels,
        datasets:[{
   
          data:dataset,
   
   
          backgroundColor:[
   
   
            'rgba(40,23,244,0.9)',
   
   
            'rgba(192,255,0,0.9)',
   
   
            'rgba(239,23,240,0.9)',
   
   
          ] }]
         }
      
    });

  }

}
