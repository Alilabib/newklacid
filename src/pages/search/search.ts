import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service';
import { GuidelinesPage } from '../guidelines/guidelines';
import { InteractivepiPage } from '../interactivepi/interactivepi';
import { DosecalcPage } from '../dosecalc/dosecalc';
import { PatientprofilesPage } from '../patientprofiles/patientprofiles';
import { PatientdetailsPage } from '../patientdetails/patientdetails';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  items = []
  searched = []
  search: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ServiceProvider) {
    this.items = [
      { title: 'acute bacterial rhinosinusitis', dep: 'guidelines' },
      { title: 'gas pharyngitis', dep: 'guidelines' },
      { title: 'community acquired pneumonia cap', dep: 'guidelines' },
      { title: 'guidelines', dep: 'guidelines' },
      { title: 'patient profiles', dep: 'patient' },
      { title: 'urtls', dep: 'patient' },
      { title: 'pharyngotonsillitis', dep: 'patient' },
      { title: 'ltrls', dep: 'patient' },
      { title: 'aecb', dep: 'patient' },
      { title: 'cab', dep: 'patient' },
      { title: 'interactive pi', dep: 'interactive' },
      { title: 'dosage forms', dep: 'interactive' },
      { title: 'contraindictions', dep: 'interactive' },
      { title: 'spectrum of activity', dep: 'interactive' },
      { title: 'precautions', dep: 'interactive' },
      { title: 'an ideal antimicrobial', dep: 'interactive' },
      { title: 'safety', dep: 'interactive' },
      { title: 'convenience', dep: 'interactive' },
      { title: 'pharmacokinetics', dep: 'interactive' },
      { title: 'resistance', dep: 'interactive' },
      { title: 'iv administration steps', dep: 'interactive' },
      { title: 'dose calculator', dep: 'dose' },
      { title: 'klacid', dep: 'patient' },
      { title: 'klacid', dep: 'interactive' },
      { title: 'klacid', dep: 'guidelines' },
      { title: 'klacid', dep: 'dose' },


    ]
  }

  onInput() {
    this.searched = this.api.filterItems(this.search, this.items);
    console.log(this.searched);
  }
  onCancel() {
    this.searched = [];
  }

  goto(p, params) {
    switch (p) {
      case 'guide':
        this.navCtrl.push(GuidelinesPage, params)
        console.log('hi')
        break;
      case 'interactive':
        this.navCtrl.push(InteractivepiPage, params)
        break;
      case 'dosecalc':
        this.navCtrl.push(DosecalcPage)
        break;
      case 'patient':
        this.navCtrl.push(PatientprofilesPage)
        break;
      case 'patient-d':
        this.navCtrl.push(PatientdetailsPage, params)
        break;

    }
  }

}
