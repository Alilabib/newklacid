import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service';
import { RefrencesPage } from '../refrences/refrences';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-dosedetails',
  templateUrl: 'dosedetails.html',
})
export class DosedetailsPage {
  segment = this.navParams.data;
  weight: any;
  data: any;
  loading: boolean
  infs = [];
  dose125 = [];
  dose250 = [];
  dose = [];
  result125: any;
  result250: any;
  result = {};
  dosage = '';
  title = '';
  d250: boolean;
  segment_footer = "g2f.png";

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ServiceProvider) {
    console.log(this.segment);
    this.initializeinf()
  }

  calc() {
    if (this.weight) {
      this.loading = true;
      let url = "doses/125?api_token=" + localStorage.getItem('token') + "&weight=" + this.weight
      let url2 = "doses/250?api_token=" + localStorage.getItem('token') + "&weight=" + this.weight

      this.api.post(url, "").then(data => {
        this.data = data
        if (this.data.statusText == "Unauthorized") {
          this.api.signOut();
          this.navCtrl.setRoot(LoginPage, '', { animate: true, animation: "ios-transitions" });
          this.api.showalert("Timeout", "Please sign in again")
        }
        this.dose125 = this.data.alldoses
        this.result125 = this.data.result;
        this.loading = false;
        if (this.data.status)
          this.segment = "pediatrics-details"
      })
      this.api.post(url2, "").then(data => {
        this.data = data
        this.dose250 = this.data.alldoses
        this.result250 = this.data.result;
        this.loading = false;
        if (this.data.status)
          this.segment = "pediatrics-details"
      })

    } else {
      this.api.showalert("", "Please fill in Weight !");
    }
  }

  recommended() {
    this.infs[0] = 'One 250 mg tablet twice daily'
    this.infs[1] = '500 mg once-daily with food'
    this.infs[2] = 'Recommended dosage of clarithromycin I.V. is 1.0 g daily , divided into two equal doses, each infused after further dilution with an appropriate I.V. diluent.The final solution to be administrated in 60 minutes period'
  }
  initializeinf() {
    this.infs[0] = ''
    this.infs[1] = ''
    this.infs[2] = ''
  }
  servecases() {
    this.infs[0] = '500 mg twice daily'
    this.infs[1] = '1000 mg once-daily (2 * 500 mg)'
    this.infs[2] = 'Recommended dosage of clarithromycin I.V. is 1.0 g daily , divided into two equal doses, each infused after further dilution with an appropriate I.V. diluent. The final solution to be administrated in 60 minutes period'
  }

  get125() {
    this.dose = this.dose125;
    this.result = this.result125;
    this.dosage = this.result125.dosage_ml + " (ml) bid ";
    this.title = "Dosage based on body weight (Kg) for 125 mg/5 ml"
    this.d250 = false;
  }
  get250() {
    this.dose = this.dose250;
    this.result = this.result250;
    this.dosage = this.result250.mg + "/(ml) twice a day ";
    this.title = "Dosage based on body weight (Kg) for 250 mg/5 ml"
    this.d250 = true;

  }
  gotofooter() {
    this.navCtrl.push(RefrencesPage);
  }
}
