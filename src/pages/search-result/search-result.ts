import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

import { Http
  // , Headers, RequestOptions 
} from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';
// import { SeatsPage } from '../seats/seats';


@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html',
})
export class SearchResultPage {

  search: any;
  
  // public recordID : any = null;
 // private baseURI : string  = "http://localhost:8080/project/";
  
  // public date: string = new Date().toISOString();

  constructor(
    public http: Http,
    public storage: Storage,
    public toastCtrl: ToastController,
    public dataProvider: ConferenceData,
    public navParams: NavParams,
    public navCtrl: NavController
  ) {}

  ionViewWillEnter() {
  
  }
  
  // bookSeat(sessionData: any) {
  // // bookSeat() {

  //   this.search = search;

  //   // this.total = this.classA * session.class_a_fare + this.classB * session.class_b_fare;
  //   // console.log(session);
  //   // console.log(session.tracks);
  //   let body : string = "key=search&start_station=" + session.start_station + "&end_station=" + session.end_station + "&classA=" + this.classA
  //                   +"&classB=" + this.classB + "&payment_status=Not Paid" + "&date=" + this.date + "&total=" + this.total,                  
  //   type : string = "application/x-www-form-urlencoded; charset=UTF-8",
  //   headers : any = new Headers({ 'Content-Type': type}),
  //   options : any = new RequestOptions({ headers: headers }),
  //   url : any = this.baseURI + "manage-passenger.php";

  //   this.http.post(url, body, options).subscribe((data) => {
  //       // If the request was successful notify the user
  //       if(data.status === 200) {
  //         // this.sendNotification(`Congratulations seat booked successfully`);
  //         this.navCtrl.push(SeatsPage, { sessionId: sessionData.id, name: sessionData.name });
  //       }
  //       // Otherwise let the user know anyway
  //       else {
  //         this.sendNotification('Something went wrong!');
  //       }
  //   });



    

  //   // this.storage.get('book').then.((data) => {
  //   //   if(data == null || data.length == 0) {
  //   //     data = [];

  //   //     data.push({
  //   //       'start_station': start_station,
  //   //       'end_station': end_station,
  //   //       'passengerAdult': passengerAdult,
  //   //       'passengerChild': passengerChild,
  //   //       'date': date,
  //   //       'class': class,
  //   //     })
  //   //   } else {
  //   //       let added = 0;
  //   //       for(let i = 0; i < data.length; i++){
  //   //         if ()
  //   //       }
  //   //   }
  //   // });

  //   // this.navCtrl.push(SeatsPage, { sessionId: sessionData.id, start_station: sessionData.start_station });
  
  // }

  // bookSeat() {
    // let body : string = "key=seat&seat=" + this.1A,                  
    //     type : string = "application/x-www-form-urlencoded; charset=UTF-8",
    //     headers : any = new Headers({ 'Content-Type': type}),
    //     options : any = new RequestOptions({ headers: headers }),
    //     url : any = this.baseURI + "manage-passenger.php";

    // this.http.post(url, body, options).subscribe((data) => {
    //    // If the request was successful notify the user
    //    if(data.status === 200) {
    //       this.sendNotification(`Congratulations ${this.firstname}, Account was successfully created`);
    //       //this.navCtrl.setRoot(WelcomePage);
    //    }
    //    // Otherwise let the user know anyway
    //    else {
    //       this.sendNotification('Something went wrong!');
    //    }
    // });
//  }

  // Manage notifying the user of the outcome of remote operations
  sendNotification(message) : void {
  let notification = this.toastCtrl.create({
      message : message,
      duration : 3000
    });
    notification.present();
  }
}
