import { Injectable } from '@angular/core';
import { Register } from './register.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private totalRegistrations :any;
  private regCount : number;
  private regUser : Register;
  private imageUrl :any;
  private userid = this.authService.getUserId();
  constructor( private http:HttpClient, private router: Router ,private authService:AuthService) { }

  setReg(eventName:string,eventId:string, fullname : string, mobileno : string,emailid  : string,
          regtype  : string,ticketcount : number,idproof  : File | string){
            this.regUser= {
              eventName:eventName,
              eventId  : eventId,
              userid   : this.userid,
              fullname : fullname,
              mobileno : mobileno,
              emailid  : emailid,
              regtype  : regtype,
              ticketcount : ticketcount,
              idproof  : idproof
            };
            // Storing in local storage
            localStorage.setItem("eventName",eventName);
            localStorage.setItem("eventId",eventId);
            localStorage.setItem("fullname",fullname);
            localStorage.setItem("mobileno",mobileno);
            localStorage.setItem("emailid",emailid);
            localStorage.setItem("regtype",regtype);
            localStorage.setItem("ticketcount",""+ticketcount);


            console.log("Reg user is set:",this.regUser);

    }

    getReg(){
      return this.regUser;
    }

    setImage(image :any){
      this.imageUrl = image;
      console.log("Setting image URL :",this.imageUrl);
    }

    getImage(){
      return this.imageUrl;
    }

    getAllReg(){
      return this.http.get<{message:string,posts: any,totalReg:number}>('http://localhost:3000/registration');
    }

    getRegToShow(){
      this.getAllReg();
      console.log("Yes",this.totalRegistrations);
      return [... this.totalRegistrations];
    }

    getTotalReg(){
      this.getAllReg();
      console.log("Yes",this.regCount);
      return this.regCount;
    }

    getRegByRegName(regname:string){
      return this.http.get<{message:string,post:any}>('http://localhost:3000/registration/register/'+regname);
    }

    addReg(eventName:string,eventId  : string,fullname : string,mobileno : string,
            emailid  : string,regtype  : string,ticketcount : number,idproof  : File | string){
              const newpostData  = new FormData();
              newpostData.append("eventName",eventName);
              newpostData.append("userid",this.userid);
              newpostData.append("eventId",eventId);
              newpostData.append("fullname",fullname);
              newpostData.append("mobileno",mobileno);
              newpostData.append("emailid",emailid);
              newpostData.append("regtype",regtype);
              newpostData.append("ticketcount",""+ticketcount);
              newpostData.append("image",idproof,fullname);

              console.log(newpostData)

              const newReg :Register ={
                eventName: eventName,
                userid   : this.userid,
                eventId  : eventId,
                fullname : fullname,
                mobileno : mobileno,
                emailid  : emailid,
                regtype  : regtype,
                ticketcount : ticketcount,
                idproof  : idproof
              } 

              console.log("hash = ",newReg);

              this.http.post<{message:string,regnum: string }>('http://localhost:3000/registration/api/register',newpostData)
              .subscribe(responseData => {
                  console.log("Reg: ",responseData.message);
                  console.log("Regnum: ",responseData.regnum);
                  localStorage.removeItem("eventName");
                  localStorage.removeItem("eventId");
                  localStorage.removeItem("fullname");
                  localStorage.removeItem("mobileno");
                  localStorage.removeItem("emailid");
                  localStorage.removeItem("regtype");
                  localStorage.removeItem("ticketcount");
                  this.router.navigate(['/success/',responseData.regnum]);
              });


    }
  

}
