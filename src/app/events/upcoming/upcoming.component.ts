import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../events.service';
import { Post } from 'src/app/events.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css']
})
export class UpcomingComponent implements OnInit, OnDestroy {

  // posts = [
  //   {
  //     Title:'First Event',
  //     organiser:'abc',
  //     info : 'This is event',
  //     date : '12/06/1999'
  //   },
  //   {
  //     Title:'First Event',
  //     organiser:'abc',
  //     info : 'This is event',
  //     date : '12/06/1999'
  //   },
  //   {
  //     Title:'First Event',
  //     organiser:'abc',
  //     info : 'This is event',
  //     date : '12/06/1999'
  //   },
  //   {
  //     Title:'First Event',
  //     organiser:'abc',
  //     info : 'This is event',
  //     date : '12/06/1999'
  //   },
  //   {
  //     Title:'First Event',
  //     organiser:'abc',
  //     info : 'This is event',
  //     date : '12/06/1999'
  //   },
  //   {
  //     Title:'First Event',
  //     organiser:'abc',
  //     info : 'This is event',
  //     date : '12/06/1999'
  //   },
  //   {
  //     Title:'First Event',
  //     organiser:'abc',
  //     info : 'This is event',
  //     date : '12/06/1999'
  //   },
  //   {
  //     Title:'First Event',
  //     organiser:'abc',
  //     info : 'This is event',
  //     date : '12/06/1999'
  //   }
  // ]

  isLoading = false;  
   posts = []
   private eventSub :Subscription;

  //  recievedPost: any

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    public eventService : EventsService
  ) { }

  ngOnInit(): void {
    this.isLoading=true;
    this.eventService.getPosts();
    this.eventSub = this.eventService.getEventUpdateListener().subscribe(
      (event:Post[])=>{
        this.isLoading=false;
        this.posts=event;
      }
    );
  }

  onDelete(postId:string){
    this.eventService.deletePost(postId);
  }

  ngOnDestroy():void{
    this.eventSub.unsubscribe();
  }
  
  // if(recievedPost){
  //   alert("came da")
  //   this.posts.push(this.recievedPost)
  // }
  


}
