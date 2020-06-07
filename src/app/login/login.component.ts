import { Component, OnInit ,EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  @Output() public childEvent = new EventEmitter()
  isLoading = false;
  private authListenerSubs : Subscription;
  userIsAuthenticated = false;

  constructor( public authService : AuthService ) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated=>{
        this.userIsAuthenticated = isAuthenticated;
    });
  }

  callSignup(){
    // alert("You just called me");
    // console.log(DashboardComponent);
    this.childEvent.emit("flex");
    // console.log("Sent flex");
  }

  onLogin(form: NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    alert("came here");
    console.log(form.value);
    this.authService.login(form.value.email, form.value.password);
    this.isLoading = false;

  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();

  }

}
