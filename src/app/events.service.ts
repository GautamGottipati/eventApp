import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from './events.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private events:Post[] = [];
  private eventsUpdated = new Subject<Post[]>();


  constructor(private http:HttpClient ,private router:Router) { }

  getPosts(){
    // console.log(this.events)
    // return [...this.events]
    this.http.get<{message:string,posts:any}>('http://localhost:3000/events/api/posts')
    .pipe(map((postData)=>{
        return postData.posts.map(post=>{
            return{
              id : post._id,
              title:post.title,
              organiser:post.organiser,
              info : post.info,
              date : post.date,
              content : post.content              
            };
        });
    }))
    .subscribe((transformedPosts)=>{
      this.events = transformedPosts
      this.eventsUpdated.next([...this.events])
    });
  }

  getPost(id: string){
    // return {...this.events.find(p=>p.id === id )};
    return this.http.get<{_id : string, title:string, organiser:string,info : string,date : any,content : string}>('http://localhost:3000/events/api/posts/'+id);
  }

  getEventUpdateListener(){
    return this.eventsUpdated.asObservable();
  }

  addPost(title:string, organiser:string,info : string,date : any,content : string){
    const newpost: Post = {id:null,
                          title:title,
                          organiser:organiser,
                          info : info,
                          date : date,
                          content : content}
    console.log(newpost)
    this.http.post<{message:string, postId:string}>('http://localhost:3000/events/api/posts',newpost)
    .subscribe((responseData)=>{
        console.log(responseData.message);
        const id = responseData.postId;
        newpost.id = id;
        this.events.push(newpost);
        this.eventsUpdated.next([...this.events]);
        // this.router.navigate(["/createevent"]);
    });
  }

  updatePost(id: string, title:string, organiser:string,info : string,date : any,content : string){
    const updatedPost :Post = {
      id:id,
      title:title,
      organiser:organiser,
      info : info,
      date: date,
      content: content
    };
    this.http.put('http://localhost:3000/events/api/posts/'+id,updatedPost)
    .subscribe(response=>{
      console.log(response);
      const myupdatedPost = [...this.events]
      const oldPostIndex = myupdatedPost.findIndex(p=> p.id === updatedPost.id);
      myupdatedPost[oldPostIndex]= updatedPost;
      this.events = myupdatedPost;
      this.eventsUpdated.next([...this.events]);
      // this.router.navigate(["/createevent"]); 
    });
  }

  deletePost(postId : string){
    this.http.delete('http://localhost:3000/events/api/posts/'+postId)
    .subscribe(()=>{
      console.log("Deleted!")
      var updatedEvents =  this.events.filter(event=> event.id != postId);
      this.events = updatedEvents;
      this.eventsUpdated.next([...this.events]);
    });
  }
}
