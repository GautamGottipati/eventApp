import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLoading= false;
  successfulSignup = false;

  constructor( public authService: AuthService , private router:Router) { }

  ngOnInit(): void {
  }

  onSignup(form: NgForm){
    // alert("Came inside signup");
    // console.log(form.value);
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    this.authService.createUser(form.value.email ,form.value.fullname,form.value.mobileNo, form.value.password);
    // this.router.navigate(["/"]);
    this.successfulSignup = true;
    this.isLoading = false;
  }

}
