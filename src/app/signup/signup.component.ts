import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit , OnDestroy {
  isLoading= false;
  successfulSignup = false;
  private authStatusSub : Subscription;

  constructor( public authService: AuthService , private router:Router) { }

  ngOnInit(): void {
   this.authStatusSub =  this.authService.getAuthStatusListener().subscribe(
     authStatus=>{
       this.isLoading= false;
     }
   )
  }

  onSignup(form: NgForm){
    if(form.invalid){
      alert("Please enter valid details");
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email ,form.value.fullname,form.value.mobileNo, form.value.password);
    // this.router.navigate(["/"]);
    this.successfulSignup = true;
    
    // this.isLoading = false;
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }

}
