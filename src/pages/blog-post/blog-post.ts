import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-blog-post',
  templateUrl: 'blog-post.html',
})
export class BlogPostPage {

  // private baseURI : string  = "http://localhost:8080/project/";
  public recordID : any = null;
  public title : string;
  public content : string;
  public description : string;

  schedules : any[]; 
  

  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams) {
  }

  // Determine whether we adding or editing a record
  // based on any supplied navigation parameters
  ionViewWillEnter() {
    this.load();

    if(this.navParams.get("record")) {
      this.selectEntry(this.navParams.get("record"));
    }
    else {
      //this.isEdited = false;
      //this.pageTitle = 'Create entry';
    }
  }

   // Assign the navigation retrieved data to properties
   // used as models on the page's HTML form
  selectEntry(post) {
    this.title = post.title;
    this.description = post.description;
    this.content = post.content;
    this.recordID = post.id;
  }

  // Retrieve the JSON encoded data from the remote server
   // Using Angular's Http class and an Observable - then
   // assign this to the items array for rendering to the HTML template
  load() {
    this.http.get('http://localhost:8080/project/blog.php')
    .map(res => res.json())
    .subscribe(data => {
      console.log(data); 
      this.schedules = data;
       
    });
  }

}