import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { EventsService } from '../events.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../events.model';
// import { read } from 'fs';
import { mimeType } from './mime-type.validator';



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
  form : FormGroup;
  imagepreview :string;
  post : Post;
  private mode = 'create';
  private postId : string;

  // newEvent = null
  // postCreated 

  constructor(public eventService:EventsService, public route :ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
        'enteredTitle':new FormControl(null, {validators:[Validators.required]}),
        'enteredOrg': new FormControl(null,{validators:[Validators.required]}),
        'enteredSummary': new FormControl(null,{validators:[Validators.required]}),
        'enteredDate': new FormControl(null,{validators:[Validators.required]}),
        'enteredValue': new FormControl(null,{validators:[Validators.required]}),
        'image':new FormControl(null,{validators:[Validators.required], asyncValidators:[mimeType]})


    });
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
        if(paramMap.has('postid')){
          console.log("Hello :",paramMap);
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
              content : postData.content,
              imagePath: postData.imagePath,
              creator:postData.creator
            };
            this.form.setValue({
              'enteredTitle':this.post.title,
              'enteredOrg': this.post.organiser,
              'enteredSummary': this.post.info,
              'enteredDate': this.post.date,
              'enteredValue': this.post.content,
              'image':this.post.imagePath

            })
          })
        }else{
          console.log("Outside ",this.post);
          this.mode = 'create';
          this.postId= null;
        }
    });
  }

  onSavePost(){
    // post:HTMLTextAreaElement
    // this.newPost = this.
    if(this.form.invalid){
      alert("enter proper values")
      
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
      this.eventService.addPost(this.form.value.enteredTitle,this.form.value.enteredOrg,this.form.value.enteredSummary,this.form.value.enteredDate,this.form.value.enteredValue,this.form.value.image)
    }else{
      this.eventService.updatePost(this.postId,this.form.value.enteredTitle,this.form.value.enteredOrg,this.form.value.enteredSummary,this.form.value.enteredDate,this.form.value.enteredValue,this.form.value.image)
    }
    this.isLoading=false;
      this.form.reset();
      console.log("reset")
    // alert(newEvent.content);
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({'image':file});
    this.form.get('image').updateValueAndValidity();
    console.log("file",file);
    console.log("form",this.form);
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagepreview = reader.result as string;
      console.log(this.imagepreview);
    };
    reader.readAsDataURL(file);
  }

  

}
