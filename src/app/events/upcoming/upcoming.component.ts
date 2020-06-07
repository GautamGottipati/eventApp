import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from '../../events.service';
import { Post } from 'src/app/events.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth.service';


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
  
  posts:Post[] = []
  foruser = [] ;
  isLoading = false;  
  totalEvents = 0;
  postsPerPage = 2;
  currentPage=1;
  pageSizeOptions = [1,3,6,9,12,15,18,20];
  userIsAuthenticated = false;
  userId:string;
   private eventSub :Subscription;
   private authStatusSub : Subscription;

  //  recievedPost: any

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    public eventService : EventsService,
    private authService :AuthService
  ) { }

  ngOnInit(): void {
    this.isLoading=true;
    this.eventService.getPosts(this.postsPerPage,this.currentPage);
    this.userId = this.authService.getUserId();
    this.eventSub = this.eventService.getEventUpdateListener().subscribe(
      (eventData:{posts: Post[],postCount: number})=>{
        this.isLoading=false;
        this.totalEvents = eventData.postCount;
        this.posts=eventData.posts;
      }
    );
    // console.log("I am adding this",this.posts);
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated=>{
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();

    });
  }

  onDelete(postId:string){
    this.isLoading = true;
    this.eventService.deletePost(postId).subscribe(()=>{
      this.eventService.getPosts(this.postsPerPage,this.currentPage);
    });
  }

  userRegistration(postId:any){
    if(!this.userIsAuthenticated){
      alert("Please login to register");
      return;
    }
    this.router.navigate(['/event',postId]);

  }

  ngOnDestroy():void{
    this.eventSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
  


}
