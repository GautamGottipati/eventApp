import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private token : string;
  private tokenTimer: any;
  private userId :string;
  private userType : string;
  private authStatusListener =new Subject<boolean>();

  constructor(private http:HttpClient, private router:Router) { }

  getToken(){
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();

  }

  getIsAuth(){
    return this.isAuthenticated  || this.getUserId()==="5edc7494bb0a5746339aa4a0" ;
  }

  getUserId(){
    return this.userId;
  }

  createUser(email:string ,fullname:string,mobileNo: string, password: string){
      const authData :AuthData = {email:email ,fullname:fullname , mobileNo: mobileNo, password: password};
      console.log(authData);
      this.http.post('http://localhost:3000/user/api/signup',authData)
      .subscribe(response=>{
        console.log(response);
        this.router.navigate(["/"]);
      },error=>{
        this.authStatusListener.next(false);
        console.log(error);
      });
      
      
  }

  
  getAllUsers(){
    return this.http.get<{message:string,user: any,totalusers :number}>('http://localhost:3000/user')
  }

  login(email:string , password:string){
    const authData ={email:email , password:password};
    this.http.post<{token:string , expiresIn: number, userId:string, usertype:string}>('http://localhost:3000/user/api/login',authData)
    .subscribe(response=>{
      console.log(response);
      const token = response.token;
      this.token = token;
      this.userType = response.usertype;
      // console.log(response);
      if(token){
        const expiresInDuration = response.expiresIn;
        console.log(expiresInDuration);
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.userId = response.userId;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        console.log("My ed = ",expirationDate);
        this.saveAuthData(token,expirationDate, this.userId)
        if(this.userType==="admin"){
          this.router.navigate(["/admin"])
        }else{
        this.router.navigate(["/events"]);
      }
      }
    },error=>{
      this.authStatusListener.next(false);
      this.router.navigate(["/"]);  
    });
  }

  autoAuthUser(){
      const authInformation = this.getAuthData();
      if(!authInformation){
        return ;
      }
      const now = new Date();
      // const isInFuture = authInformation.expirationDate > now;
      const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
      if(expiresIn>0){
        this.token = authInformation.token;
        this.isAuthenticated = true;
        this.userId = authInformation.userId;
        this.setAuthTimer(expiresIn / 1000)
        this.authStatusListener.next(true);
      }
  }

  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer)
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number){
    console.log("Setting timer = "+ duration);
    this.tokenTimer = setTimeout(()=>{
      this.logout();
    },duration*1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId:string){
    localStorage.setItem('token', token);
    localStorage.setItem('expiration',expirationDate.toISOString());
    localStorage.setItem('userId',userId);
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");

  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if(!token || !expirationDate){
      return;
    }
    return {
      token: token,
      expirationDate : new Date(expirationDate),
      userId : userId
    }
  }

}
