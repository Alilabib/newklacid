import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';


@Component({
  selector: 'page-tabeldetails',
  templateUrl: 'tabeldetails.html',
})
export class TabeldetailsPage {
  data = this.navParams.data.data;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    console.log(this.data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabeldetailsPage');
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
