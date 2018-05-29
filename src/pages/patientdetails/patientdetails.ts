import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { RefrencesPage } from '../refrences/refrences';


@Component({
  selector: 'page-patientdetails',
  templateUrl: 'patientdetails.html',
})
export class PatientdetailsPage {
  segment: string = "urt";
  segment2: string = "clinical";
  segment_footer = "g2f.png";
  @ViewChild(Slides) slide: Slides;
  patient = this.navParams.data;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (this.patient == 'p3' || this.patient == 'p4')
      this.segment = "lrt"
  }

  gotodetails(fab, patient) {
    switch (patient) {
      case 'p1':

        switch (fab) {
          case 'fab1':
            this.slide.slideTo(2, 2000)
            break;
          case 'fab2':
            this.slide.slideTo(4, 2000)
            break;
          case 'fab3':
            this.slide.slideTo(8, 2000)
            break;
          case 'fab4':
            this.slide.slideTo(11, 2000)
            break;
          case 'fab5':
            this.slide.slideTo(13, 2000)
            break;
          case 'fab6':
            this.slide.slideTo(14, 2000)
            break;
        }

        break;
      case 'p2':

        switch (fab) {
          case 'fab1':
            this.slide.slideTo(2, 2000)
            break;
          case 'fab2':
            this.slide.slideTo(4, 2000)

            break;
          case 'fab3':
            this.slide.slideTo(6, 2000)

            break;
          case 'fab4':
            this.slide.slideTo(10, 2000)

            break;
        }

        break;
      case 'p3':

        switch (fab) {
          case 'fab1':
            this.slide.slideTo(2, 2000)
            break;
          case 'fab2':
            this.slide.slideTo(5, 2000)
            break;
          case 'fab3':
            this.slide.slideTo(6, 2000)

            break;
          case 'fab4':
            this.slide.slideTo(8, 2000)

            break;
        }

        break;
      case 'p4':

        switch (fab) {
          case 'fab1':
            this.slide.slideTo(2, 2000)
            break;
          case 'fab2':
            this.slide.slideTo(5, 2000)

            break;
          case 'fab3':
            this.slide.slideTo(9, 2000)

            break;
          case 'fab4':
            this.slide.slideTo(13, 2000)
            break;

        }

        break;
    }

  }
  gotofooter() {
    this.navCtrl.push(RefrencesPage);
  }
}
