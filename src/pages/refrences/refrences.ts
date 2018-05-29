import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-refrences',
  templateUrl: 'refrences.html',
})
export class RefrencesPage {
  refrences = []
  data: any;
  loading: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ServiceProvider, public viewCtrl: ViewController) {
    this.getrefrences()
  }

  getrefrences() {
    this.loading = true;
    this.api.get("refrences?api_token=" + localStorage.getItem('token')).then(data => {
      this.data = data
      if (this.data.statusText == "Unauthorized") {
        this.api.signOut();
        this.navCtrl.setRoot(LoginPage, '', { animate: true, animation: "ios-transitions" });
        this.api.showalert("Timeout", "Please sign in again")
      }
      this.refrences = this.data.result.data;
      this.loading = false;
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
