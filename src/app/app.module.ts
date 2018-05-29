import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CalendarModule } from "ion2-calendar";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { TheloungePage } from '../pages/thelounge/thelounge';
import { AskingyouPage } from '../pages/askingyou/askingyou';
import { DosecalcPage } from '../pages/dosecalc/dosecalc';
import { GuidelinesPage } from '../pages/guidelines/guidelines';
import { EventsPage } from '../pages/events/events';
import { InteractivepiPage } from '../pages/interactivepi/interactivepi';
import { PatientprofilesPage } from '../pages/patientprofiles/patientprofiles';
import { SearchPage } from '../pages/search/search';
import { ProfilePage } from '../pages/profile/profile';
import { PatientdetailsPage } from '../pages/patientdetails/patientdetails';
import { ChatPage } from '../pages/chat/chat';
import { OneSignal } from '@ionic-native/onesignal';
import { EventdetailsPage } from '../pages/eventdetails/eventdetails';
import { TabeldetailsPage } from '../pages/tabeldetails/tabeldetails';
import { DosedetailsPage } from '../pages/dosedetails/dosedetails';
import { RefrencesPage } from '../pages/refrences/refrences';
import { ServiceProvider } from '../providers/service';
import { HttpModule } from '@angular/http';
import { CollapsibleModule } from 'angular2-collapsible';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TheloungePage,
    AskingyouPage,
    DosecalcPage,
    GuidelinesPage,
    EventsPage,
    InteractivepiPage,
    PatientprofilesPage,
    SearchPage,
    ProfilePage,
    PatientdetailsPage,
    ChatPage,
    EventdetailsPage,
    TabeldetailsPage,
    DosedetailsPage,
    RefrencesPage,
    
  ],
  imports: [ 
    FormsModule, 
    BrowserModule,
    HttpModule,  
    CalendarModule,  
    IonicModule.forRoot(MyApp, {
      scrollAssist: false, 
      autoFocusAssist: true,
      backButtonText: '',
      menuType:'overlay'
  }),
    BrowserAnimationsModule,  // <-- include required BrowserAnimationsModule
    CollapsibleModule ,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TheloungePage,
    AskingyouPage,
    DosecalcPage,
    GuidelinesPage,
    EventsPage,
    InteractivepiPage,
    PatientprofilesPage,
    SearchPage,
    ProfilePage,
    PatientdetailsPage,
    ChatPage,
    EventdetailsPage,
    TabeldetailsPage,
    DosedetailsPage,
    RefrencesPage,
    
    
  ],
  providers: [
    PhotoViewer,
    File,
    FileTransfer,
    Camera,
    OneSignal,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider
  ]
})
export class AppModule {}
