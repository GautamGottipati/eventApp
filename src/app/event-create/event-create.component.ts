import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventsService } from '../events.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../events.model';


@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  newPost = "No content";
  enteredTitle = '';
  enteredOrg = '';
  enteredSummary = '';
  enteredValue = '';
  enteredDate = '';
  isLoading = false;
  post : Post;
  private mode = 'create';
  private postId : string;

  // newEvent = null
  // postCreated 

  constructor(public eventService:EventsService, public route :ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
        if(paramMap.has('postid')){
          console.log("Hello :",this.post);
          this.mode = 'edit';
          this.postId = paramMap.get('postid');
          // Show spin wheel here
          this.isLoading=true;
          this.eventService.getPost(this.postId).subscribe(postData=>{
            // disable spin wheel here
            this.isLoading=false;
            this.post = {
              id : postData._id,
              title:postData.title,
              organiser:postData.organiser,
              info : postData.info,
              date : postData.date,
              content : postData.content
            }
          })
        }else{
          console.log("Outside ",this.post);
          this.mode = 'create';
          this.postId= null;
        }
    });
  }

  onSavePost(form:NgForm){
    // post:HTMLTextAreaElement
    // this.newPost = this.
    if(form.invalid){
      // alert("enter proper values")
      return
    }
    // alert("came in new")
    // const newEvent = {
    //       Title:form.value.enteredTitle,
    //       organiser:form.value.enteredOrg,
    //       info : form.value.enteredSummary,
    //       date : form.value.enteredDate,
    //       content : form.value.enteredValue
    //   }
    this.isLoading= true;
    if(this.mode==="create"){
      this.eventService.addPost(form.value.enteredTitle,form.value.enteredOrg,form.value.enteredSummary,form.value.enteredDate,form.value.enteredValue)
    }else{
      this.eventService.updatePost(this.postId,form.value.enteredTitle,form.value.enteredOrg,form.value.enteredSummary,form.value.enteredDate,form.value.enteredValue)
    }
    this.isLoading=false;
      form.resetForm();
      console.log("reset")
    // alert(newEvent.content);
  }

  

}
