import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EventdetailsPage } from '../eventdetails/eventdetails';
import { ServiceProvider } from '../../providers/service';
import { LoginPage } from '../login/login';
import { CalendarComponentOptions } from 'ion2-calendar';


@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})

export class EventsPage {
  date: any
  segment: string = "calendar"
  Date = new Date();
  today_date = "";
  data: any;
  loading: boolean;

  now = new Date();
  listview = []
  monthNames = ["Jan", "Feb", "March", "April", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  coloredDays = [
  ];
  optionsMulti: CalendarComponentOptions = {
    from:2010,
    daysConfig:[]
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ServiceProvider) {
    this.today_date = this.Date.toDateString()
    this.getdata()
    console.log(this.coloredDays)
  }

  getdata() {
    this.loading = true
    this.api.get("events?api_token=" + localStorage.getItem('token')).then(data => {
      this.data = data
      if (this.data.statusText == "Unauthorized") {
        this.api.signOut();
        this.navCtrl.setRoot(LoginPage, '', { animate: true, animation: "ios-transitions" });
        this.api.showalert("Timeout", "Please sign in again")
      }
      this.listview = this.data.result.all_events.data;
      this.listview.forEach(element => {
        element.day = new Date(element.event_date).getUTCDay()
        element.month = this.monthNames[new Date(element.event_date).getMonth()];
        if (element.schedule_type == "event") {
           let day =  new Date(element.event_date);
           this.optionsMulti.daysConfig.push({date:day,cssClass:'orange'})
           console.log(this.optionsMulti)
        } else {
          let day = new Date(element.event_date)
          this.optionsMulti.daysConfig.push({date:day,cssClass:'green'})
          console.log(this.optionsMulti)
          
        }
      });
      this.loading = false

    })
  }



  gotoevent(ev) {
    this.navCtrl.push(EventdetailsPage, ev);
  }

  onPeriodChange(event) {
    console.log(this.date)
  }
  segmentChanged(event) {

  }

}
