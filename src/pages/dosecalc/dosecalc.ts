import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DosedetailsPage } from '../dosedetails/dosedetails';


@Component({
  selector: 'page-dosecalc',
  templateUrl: 'dosecalc.html',
})
export class DosecalcPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  gotodetails(info) {
    switch (info) {
      case 'adults':
        this.navCtrl.push(DosedetailsPage, 'adults')
        break;
      case 'pediatrics':
        this.navCtrl.push(DosedetailsPage, 'pediatrics')
        break;
    }
  }

}
