import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';
import { PaymentPage } from '../payment/payment';
// import { PayLaterPage } from '../pay-later/pay-later';

import { Storage } from '@ionic/storage';
import { UserData } from '../../providers/user-data';

// import { LoginPage } from "../login/login";

@Component({
  selector: 'page-seats',
  templateUrl: 'seats.html',
})
export class SeatsPage {
  
  session: any;

  date: any;
  passengers: any;

  qrData: any;
  qrData1: any;
  createdCode = null;

  constructor(public toastCtrl: ToastController,public userData: UserData,public storage: Storage,public dataProvider: ConferenceData, public navCtrl: NavController, public navParams: NavParams) {
    
  }
  
  payNow(sessionData: any) {
    this.createdCode = sessionData.duration + ' ' + sessionData.end_station;
    let data = {
      qrData: sessionData.duration,
      qrData1: sessionData.end_station
    }
    this.navCtrl.push(PaymentPage, data);
  }

  bookSeat(sessionData: any) {
    console.log(sessionData.id);
    console.log(sessionData.start_station);
    // this.navCtrl.push(PaymentPage, { sessionId: sessionData.id, start_station: sessionData.start_station });
  }
  
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

  sendNotification(message) : void {
  let notification = this.toastCtrl.create({
      message : message,
      duration : 3000
    });
    notification.present();
  }
  
}
