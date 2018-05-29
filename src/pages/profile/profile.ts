import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  data: any;
  user = {}
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ServiceProvider, public viewCtrl: ViewController) {
    this.getdata()
  }



  getdata() {
    this.api.get("user?api_token=" + localStorage.getItem('token')).then(data => {
      this.data = data;
      if (this.data.statusText == "Unauthorized") {
        this.api.signOut();
        this.navCtrl.setRoot(LoginPage, '', { animate: true, animation: "ios-transitions" });
        this.api.showalert("Timeout", "Please sign in again")
      }
      this.user = this.data;
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
