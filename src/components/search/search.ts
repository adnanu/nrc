import { Component, ViewChild, OnInit, Renderer } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchResultPage } from './../../pages/search-result/search-result';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'search',
  templateUrl: 'search.html'
})
export class SearchComponent implements OnInit {

  contentExpanded = false;
  @ViewChild("cc") searchContent: any;

  // oneway =  true;
  // return =  false;

  from: any;
  to: any;

  public date: string = new Date().toISOString();  

  public stations : any = [];

  constructor(public navCtrl: NavController, public renderer: Renderer, public http: Http) {
    
  }

  ngOnInit() {
    this.load();    
    // console.log(this.searchContent.nativeElement);
    this.renderer.setElementStyle(this.searchContent.nativeElement, "webkitTransition" ,"max-height 500ms, padding 500ms");
  }
  
  
  load() {
    this.http.get('http://localhost:8080/nrcproject - copy/stations.php').map(res => 
    res.json()).subscribe(data => {
      this.stations = data;
    });
  }

  swap() {
    let from = this.from;
    this.from = this.to;
    this.to = from;
  }

  // tripType() {
  //   // let oneway = this.oneway;
  //   // this.oneway = !this.return;
  //   // this.return = !oneway;

  //   this.oneway = !this.return;
  //   this.return = !this.oneway;   
    
  //   // if (this.oneway) {
  //   //   this.oneway = !this.oneway;
  //   //   this.return = !this.return      
  //   // } else if(this.return) {
  //   //   this.return = !this.return
  //   //   // this.oneway = !this.oneway;      
  //   // } else {
  //   //   this.oneway = !this.oneway;      
  //   // }
    
  //   console.log('Oneway new state:' + this.oneway);
  //   console.log('Return new state:' + this.return);
  // }

  toggleSearch() {
    if (this.contentExpanded) {
      this.renderer.setElementStyle(this.searchContent.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(this.searchContent.nativeElement, "padding", "0px 16px");      
      this.renderer.setElementStyle(this.searchContent.nativeElement, "margin-top", "0px");  
    } else {
      this.renderer.setElementStyle(this.searchContent.nativeElement, "max-height", "500px");
      this.renderer.setElementStyle(this.searchContent.nativeElement, "padding", "13px 16px");            
      this.renderer.setElementStyle(this.searchContent.nativeElement, "margin-top", "-30px");
    }
    // this.contentExpanded = !this.contentExpanded;        
  }

  close() {
    if (!this.contentExpanded) {
      this.renderer.setElementStyle(this.searchContent.nativeElement, "max-height", "0px");
      this.renderer.setElementStyle(this.searchContent.nativeElement, "padding", "0px 16px");      
      this.renderer.setElementStyle(this.searchContent.nativeElement, "margin-top", "0px");  
    } else {
      this.renderer.setElementStyle(this.searchContent.nativeElement, "max-height", "500px");
      this.renderer.setElementStyle(this.searchContent.nativeElement, "padding", "13px 16px");            
      this.renderer.setElementStyle(this.searchContent.nativeElement, "margin-top", "-30px");
    }
    // this.contentExpanded = !this.contentExpanded;       
  }
  
  searchBtn() {
    this.navCtrl.push(SearchResultPage);
  }

}
