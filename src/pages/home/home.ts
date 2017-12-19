import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { SupportPage } from '../support/support';
import { SchedulePage } from '../schedule/schedule';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  schedules() {
    this.navCtrl.push(SchedulePage);
  }

  about(){
    this.navCtrl.push(AboutPage);
  }

  support(){
    this.navCtrl.push(SupportPage);
  }

}
