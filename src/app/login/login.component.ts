import { Component, OnInit ,EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
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
  private authStatusSub : Subscription;
  userIsAuthenticated = false;

  constructor( public authService : AuthService, private router: Router ) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated=>{
        this.userIsAuthenticated = isAuthenticated;
    });

    this.authStatusSub = this.authService.getAuthStatusListener()
    .subscribe(authStatus=>{
      this.isLoading = false;
    })
  }

  callSignup(){
    this.router.navigate(['signup']);

  }

  onLogin(form: NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    console.log(form.value);
    this.authService.login(form.value.email, form.value.password);
    // this.isLoading = false;

  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authListenerSubs.unsubscribe();
    this.authStatusSub.unsubscribe();

  }

}
