import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GuidelinesPage } from '../guidelines/guidelines';
import { PatientprofilesPage } from '../patientprofiles/patientprofiles';
import { EventsPage } from '../events/events';
import { InteractivepiPage } from '../interactivepi/interactivepi';
import { DosecalcPage } from '../dosecalc/dosecalc';
import { SearchPage } from '../search/search';
import { AskingyouPage } from '../askingyou/askingyou';
import { TheloungePage } from '../thelounge/thelounge';
import { NavOptions } from 'ionic-angular/navigation/nav-util';
import { ServiceProvider } from '../../providers/service';
import { OneSignal } from '@ionic-native/onesignal';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public api: ServiceProvider, public one: OneSignal, public splashScreen: SplashScreen) {
    this.initializeOnesignal()
  }

  openpage(page) {
    let options: NavOptions = {
      animate: true,
      animation: 'ios-transitions',
      direction: 'forward'
    }
    switch (page) {
      case 'guid':
        this.navCtrl.setRoot(GuidelinesPage, '', options)
        break;
      case 'patient':
        this.navCtrl.setRoot(PatientprofilesPage, '', options)
        break;
      case 'events':
        this.navCtrl.setRoot(EventsPage, '', options)
        break;
      case 'interactive':
        this.navCtrl.setRoot(InteractivepiPage, '', options)
        break;
      case 'dose':
        this.navCtrl.setRoot(DosecalcPage, '', options)
        break;
      // case 'online':
      //   this.navCtrl.setRoot(OnlinecoursesPage, '', options)
      //   break;
      case 'search':
        this.navCtrl.setRoot(SearchPage, '', options)
        break;
      case 'asking':
        this.navCtrl.setRoot(AskingyouPage, '', options)
        break;
      case 'lounge':
        this.navCtrl.setRoot(TheloungePage, '', options)
        break;
      // case 'medication':
      //   this.navCtrl.setRoot(MedicationguidePage, '', options)
      //   break;
    }
  }

  initializeOnesignal() {
    this.one.getIds().then(data => {
      let url = "update/account?api_token=" + localStorage.getItem('token') + "&onesignal_id=" + data.userId;
      this.api.post(url, "").then(data => {

      })
    })

  }


}
