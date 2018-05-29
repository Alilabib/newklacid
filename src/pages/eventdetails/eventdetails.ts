import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-eventdetails',
  templateUrl: 'eventdetails.html',
})
export class EventdetailsPage {
  event = this.navParams.data
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event.year = new Date(this.event.event_date).getFullYear();
  }


}
