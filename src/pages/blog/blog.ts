import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { NavController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// import { ServiceProvider } from './../../providers/service-provider';
import { BlogPostPage } from './../blog-post/blog-post';


@Component({
  selector: 'page-blog',
  templateUrl: 'blog.html'
})
export class BlogPage {

  posts : any[];

  constructor(public platform: Platform, public navCtrl: NavController, public http: Http) {
  }

  ionViewWillEnter() {
    this.load();
  }

   // Retrieve the JSON encoded data from the remote server
   // Using Angular's Http class and an Observable - then
   // assign this to the items array for rendering to the HTML template
  load() {
    this.http.get('http://localhost:8080/project/blog.php')
    .map(res => res.json())
    .subscribe(data => {
      //console.log(data); 
      this.posts = data;
       
    });
  }

   // Allow navigation to the AddTechnology page for amending an existing entry
   // (We supply the actual record to be amended, as this method's parameter,
   // to the AddTechnology page
   viewPost(param) {
      this.navCtrl.push(BlogPostPage, param);
   }


}