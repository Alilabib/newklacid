import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PatientdetailsPage } from '../patientdetails/patientdetails';


@Component({
  selector: 'page-patientprofiles',
  templateUrl: 'patientprofiles.html',
})
export class PatientprofilesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }



  gotodetails(patient) {
    switch (patient) {
      case 'p1':
        this.navCtrl.push(PatientdetailsPage, 'p1');
        break;
      case 'p2':
        this.navCtrl.push(PatientdetailsPage, 'p2');
        break;
      case 'p3':
        this.navCtrl.push(PatientdetailsPage, 'p3');
        break;
      case 'p4':
        this.navCtrl.push(PatientdetailsPage, 'p4');
        break;
    }
  }

}
