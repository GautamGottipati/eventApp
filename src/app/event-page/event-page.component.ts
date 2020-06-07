import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../events.model';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
  image = "../../assets/images/banner-1.jpg";

  display = "none";
  post: Post;
  private postId :string;

  constructor(public eventService:EventsService, public router:Router, public route:ActivatedRoute ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      console.log("Printing paramMap ",paramMap);
      this.postId = paramMap.get('postid');
      this.eventService.getPost(this.postId).subscribe(postData=>{
        this.post = {
          id : postData._id,
          title:postData.title,
          organiser:postData.organiser,
          info : postData.info,
          date : postData.date,
          content : postData.content,
          imagePath: postData.imagePath,
          creator:postData.creator
        };
      });
    })
  }

  register(){
    // this.display = "flex";
    alert(this.post.id);
    this.router.navigate(['/event',this.post.id,'register']);
  }

  getDisplay(){
    return this.display;
  }

  close(){
    this.display = "none";
  }

}
