import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { GuidelinesPage } from '../pages/guidelines/guidelines';
import { AskingyouPage } from '../pages/askingyou/askingyou';
import { TheloungePage } from '../pages/thelounge/thelounge';
import { InteractivepiPage } from '../pages/interactivepi/interactivepi';
import { DosecalcPage } from '../pages/dosecalc/dosecalc';
import { EventsPage } from '../pages/events/events';
import { SearchPage } from '../pages/search/search';
import { PatientprofilesPage } from '../pages/patientprofiles/patientprofiles';
import { ProfilePage } from '../pages/profile/profile';
import { OneSignal } from '@ionic-native/onesignal';
import { ServiceProvider } from '../providers/service';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private oneSignal: OneSignal,public api : ServiceProvider,public modalCtrl: ModalController) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    if(localStorage.getItem('remember_me')){
      this.rootPage = HomePage;
    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.enablenotifications()
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  enablenotifications(){
this.oneSignal.startInit('5ab208e1-e55f-44bb-8d82-b09d8a8a8951', '1036625207954');

this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

this.oneSignal.handleNotificationReceived().subscribe(() => {
 // do something when notification is received
});

this.oneSignal.handleNotificationOpened().subscribe(() => {
  // do something when a notification is opened
});

this.oneSignal.endInit();
  }

  openPage(page) {
   console.log(page)
    let options = {
      animate:true,
      animation: 'ios-transitions',
      direction : 'forward'
    }
    if(page=='logout'){
      options.direction = 'back'
    }
    switch(page){
      case 'home' :
    this.nav.setRoot(HomePage,'',options);
      break;
      case 'guid' :
    this.nav.setRoot(GuidelinesPage,'',options);
      break;
      case 'asking' :
    this.nav.setRoot(AskingyouPage,'',options);
      break;
      case 'lounge' :
    this.nav.setRoot(TheloungePage,'',options);
      break;
      case 'interactive' :
    this.nav.setRoot(InteractivepiPage,'',options);
      break;
      case 'dose' :
    this.nav.setRoot(DosecalcPage,'',options);
      break;
      case 'events' :
    this.nav.setRoot(EventsPage,'',options);
      break;
      case 'search' :
    this.nav.setRoot(SearchPage,'',options);
      break;
    //   case 'settings' :
    // this.nav.setRoot(SettingsPage,'',options);
    //   break;
      case 'patient' :
    this.nav.setRoot(PatientprofilesPage,'',options);
      break;
    //   case 'online' :
    // this.nav.setRoot(OnlinecoursesPage,'',options);
    //   break;
    //   case 'medication' :
    // this.nav.setRoot(MedicationguidePage,'',options);
     // break;
      case 'profile' :
   // this.nav.setRoot(ProfilePage,'',options);
   let modal = this.modalCtrl.create(ProfilePage);
   modal.present();
      break;
      case 'logout' :
    this.nav.setRoot(LoginPage,'',options);
    this.api.signOut()
      break;
    }
  }
}
