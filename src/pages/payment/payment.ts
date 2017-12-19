import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

// import { TabsPage } from '../tabs-page/tabs-page';


import { NgForm } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  payerName: ''; payerEmail: ''; payerPhone: ''; amt : ''; paymenttype: '' ;
  
  qrData: any;
  qrData1: any;
  createdCode = null;

  submitted = false;
  
  // Property to store the recordID for when an existing entry is being edited
  public recordID : any = null;
  private baseURI : string  = "http://localhost:8080/project/";
  
  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams, public toastCtrl: ToastController) {
    this.qrData = navParams.get('qrData');
    this.qrData1 = navParams.get('qrData1');
  }

  ionViewDidLoad() {
    this.createdCode = this.qrData + ' ' + this.qrData1;
  }

  onPayment(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      let body : string = "key=create&fullname=" + this.payerName + "&email=" + this.payerEmail + "&phone=" + this.payerPhone
                        +"&amount=" + this.amt + "&paymenttype=" + this.paymenttype,                  
        type : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers : any = new Headers({ 'Content-Type': type}),
        options : any = new RequestOptions({ headers: headers }),
        url : any = this.baseURI + "manage-passenger.php";

    this.http.post(url, body, options).subscribe((data) => {
       // If the request was successful notify the user
       if(data.status === 200) {
          this.sendNotification(`Payment was successfully`);
          this.navCtrl.setRoot(HomePage);
       }
       // Otherwise let the user know anyway
       else {
          this.sendNotification('Something went wrong!');
       }
    });
    }
  }

  sendNotification(message) : void {
  let notification = this.toastCtrl.create({
      message : message,
      duration : 3000
    });
    notification.present();
  }

}
