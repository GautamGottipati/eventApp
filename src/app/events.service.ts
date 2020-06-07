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
  private eventsUpdated = new Subject<{posts: Post[],postCount: number}>();


  constructor(private http:HttpClient ,private router:Router) { }

  getPosts(postsPerPage: number , currentPage: number){
    // console.log(this.events)
    // return [...this.events]
    // const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`
    this.http.get<{message:string,posts:any ,maxPosts:number}>('http://localhost:3000/events/api/posts')
    .pipe(map((postData)=>{
        return {posts : postData.posts.map(post=>{
            return{
              id : post._id,
              title:post.title,
              organiser:post.organiser,
              info : post.info,
              date : post.date,
              content : post.content,
              imagePath:post.imagePath,
              creator : post.creator      
            };
        }), maxPosts:postData.maxPosts
      };
    }))
    .subscribe((transformedPosts)=>{
      console.log(transformedPosts);
      this.events = transformedPosts.posts;
      this.eventsUpdated.next({posts:[...this.events],
                              postCount :transformedPosts.maxPosts});
    });
    // this.router.navigate(["/createevent"]);
  }

  getAllPosts(){
    return this.http.get<{message:string,posts:any ,maxPosts:number}>('http://localhost:3000/events/api/posts');
  }

  getPost(id: string){
    // return {...this.events.find(p=>p.id === id )};
    return this.http.get<{_id : string, title:string, organiser:string,info : string,date : any,content : string ,imagePath: string, creator:string}>(
      'http://localhost:3000/events/api/posts/'+id
      );
  }

  getEventUpdateListener(){
    return this.eventsUpdated.asObservable();
  }

  addPost(title:string, organiser:string,info : string,date : any,content : string , image:File){
    // const newpost: Post = {id:null,
    //                       title:title,
    //                       organiser:organiser,
    //                       info : info,
    //                       date : date,
    //                       content : content}
    const newpostData  = new FormData();
    newpostData.append("title",title);
    newpostData.append("organiser",organiser);
    newpostData.append("info",info);
    newpostData.append("date",date);
    newpostData.append("content",content);
    newpostData.append("image",image,title);
    console.log(newpostData)
    this.http.post<{message:string, post:Post}>('http://localhost:3000/events/api/posts',newpostData)
    .subscribe((responseData)=>{
        console.log(responseData.message);
        // const newpost: Post={
        //   id:responseData.post.id,
        //   title:title,
        //   organiser:organiser,
        //   info:info,
        //   date:date,
        //   content:content,
        //   imagePath:responseData.post.imagePath

        // }
        // // const id = responseData.postId;
        // // newpost.id = id;
        // this.events.push(newpost);
        // this.eventsUpdated.next([...this.events]);
        console.log("Came here buddy");
        this.router.navigate(["/"]);
    });
  }

  updatePost(id: string, title:string, organiser:string,info : string,date : any,content : string, image: File | string){
    // const updatedPost :Post = {
    //   id:id,
    //   title:title,
    //   organiser:organiser,
    //   info : info,
    //   date: date,
    //   content: content,
    //   imagePath: null
    // };
    let postData : Post | FormData ;
    if(typeof(image)==='object'){
       postData  = new FormData();
       postData.append("id",id);
    postData.append("title",title);
    postData.append("organiser",organiser);
    postData.append("info",info);
    postData.append("date",date);
    postData.append("content",content);
    postData.append("image",image,title);

    }else{
       postData = {
          id:id,
          title:title,
          organiser:organiser,
          info : info,
          date: date,
          content: content,
          imagePath: image,
          creator:null
        };
    }
    this.http.put('http://localhost:3000/events/api/posts/'+id,postData)
    .subscribe(response=>{
      console.log(response);
      // const myupdatedPost = [...this.events]
      // const oldPostIndex = myupdatedPost.findIndex(p=> p.id === id);
      // const post :Post = {
      //   id:id,
      //   title:title,
      //   organiser:organiser,
      //   info : info,
      //   date: date,
      //   content: content,
      //   imagePath: image
      // }; 
      // myupdatedPost[oldPostIndex]= post;
      // this.events = myupdatedPost;
      // this.eventsUpdated.next([...this.events]);
      this.router.navigate(["/createevent"]); 
    });
  }

  deletePost(postId : string){
    return this.http.delete('http://localhost:3000/events/api/posts/'+postId);
    // .subscribe(()=>{
    //   console.log("Deleted!")
    //   var updatedEvents =  this.events.filter(event=> event.id != postId);
    //   this.events = updatedEvents;
    //   this.eventsUpdated.next([...this.events]);
    // });
  }
}
