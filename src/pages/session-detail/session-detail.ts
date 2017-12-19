import { Component } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';
import { SeatsPage } from '../seats/seats';

import { NavController, NavParams, ToastController } from 'ionic-angular';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: any;

  public recordID : any = null;
  private baseURI : string  = "http://localhost:8080/project/";
  
  public date: string = new Date().toISOString();
  
  total:any;
  classA = 1;
  classB = 0;

  constructor(
    public http: Http,
    public storage: Storage,
    public toastCtrl: ToastController,
    public dataProvider: ConferenceData,
    public navParams: NavParams,
    public navCtrl: NavController
  ) {}


  ionViewWillEnter() {
    // this.userData.hasLoggedIn().then((hasLoggedIn) => {
    //   if (hasLoggedIn == false){
    //     this.sendNotification(`Please Login First`);
    //     this.navCtrl.setRoot(LoginPage);
    //     // console.log(hasLoggedIn + 'f');
    //   }
    // });


    this.dataProvider.load().subscribe((data: any) => {
      if (
        data &&
        data.schedule &&
        data.schedule[0] &&
        data.schedule[0].groups
      ) {
        for (const group of data.schedule[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === this.navParams.data.sessionId) {
                this.session = session;
                break;
              }
            }
          }
        }
      }
    });
  }
  
  bookSeat(sessionData: any) {
  // bookSeat() {

    this.dataProvider.load().subscribe((data: any) => {
      if (
        data &&
        data.schedule &&
        data.schedule[0] &&
        data.schedule[0].groups
      ) {
        for (const group of data.schedule[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === this.navParams.data.sessionId) {
                this.session = session;

                // this.end_station = session.end_station;

                //  // this.classB = session.class_b_fare;
                this.total = this.classA * session.class_a_fare + this.classB * session.class_b_fare;
                // console.log(session);
                // console.log(session.tracks);
                let body : string = "key=book&start_station=" + session.start_station + "&end_station=" + session.end_station + "&classA=" + this.classA
                    +"&classB=" + this.classB + "&payment_status=Not Paid" + "&date=" + this.date + "&total=" + this.total,                  
    type : string = "application/x-www-form-urlencoded; charset=UTF-8",
    headers : any = new Headers({ 'Content-Type': type}),
    options : any = new RequestOptions({ headers: headers }),
    url : any = this.baseURI + "manage-passenger.php";

    this.http.post(url, body, options).subscribe((data) => {
        // If the request was successful notify the user
        if(data.status === 200) {
          // this.sendNotification(`Congratulations seat booked successfully`);
          this.navCtrl.push(SeatsPage, { sessionId: sessionData.id, name: sessionData.name });
        }
        // Otherwise let the user know anyway
        else {
          this.sendNotification('Something went wrong!');
        }
    });

                break;
              }
            }
          }
        }
      }
    });


    

    // this.storage.get('book').then.((data) => {
    //   if(data == null || data.length == 0) {
    //     data = [];

    //     data.push({
    //       'start_station': start_station,
    //       'end_station': end_station,
    //       'passengerAdult': passengerAdult,
    //       'passengerChild': passengerChild,
    //       'date': date,
    //       'class': class,
    //     })
    //   } else {
    //       let added = 0;
    //       for(let i = 0; i < data.length; i++){
    //         if ()
    //       }
    //   }
    // });

    // this.navCtrl.push(SeatsPage, { sessionId: sessionData.id, start_station: sessionData.start_station });
  
  }

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
