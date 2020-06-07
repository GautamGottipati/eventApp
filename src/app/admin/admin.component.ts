import { Component, OnInit } from '@angular/core';
import { getNumberOfCurrencyDigits } from '@angular/common';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';
import { EventsService } from '../events.service';
import { AuthService } from '../auth.service';

export interface Tile {
  color: string;
  cols: number;
  link : string;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  totalReg;
  totalEvents;
  totalUsers;
  color1 = '#DDBDF1';
  color2 = 'lightblue';
  color3 = 'lightgreen';
  color4 = 'lightpink';
  tiles: Tile[] = [
    {text: 'Total Registrations', link:'/admin/reg' , cols: 2, rows: 1, color: '#DDBDF1'},
    {text: 'Total Users',link:'/admin/users', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Total Events',link:'/admin/events', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Admins',link:'/admin/list', cols: 1, rows: 1, color: 'lightpink'}
  ];
  isLoading = true;

  constructor(private regService:RegisterService ,private eventService:EventsService,
    private authService:AuthService, public router:Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    console.log("came here")
    this.regService.getAllReg().subscribe(users=>{
      console.log("Hello ma",users);
      // this.totalRegistrations = users.posts;
      this.totalReg = users.totalReg
      console.log("Ida1a kada",this.totalReg)
      this.totalReg = users.totalReg;
    });
    this.authService.getAllUsers().subscribe(users=>{
      this.totalUsers = users.totalusers;
      
    });
    this.eventService.getAllPosts().subscribe(events=>{
      this.totalEvents = events.maxPosts; 
    });
    // this.eventService.getAllPosts().subscribe(dummy=>{
      
    // })
    
    console.log("Printing this ",this.tiles)
    this.isLoading = false;
  }

  
  


}
