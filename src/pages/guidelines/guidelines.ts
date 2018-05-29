import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { TabeldetailsPage } from '../tabeldetails/tabeldetails';
import { RefrencesPage } from '../refrences/refrences';


@Component({
  selector: 'page-guidelines',
  templateUrl: 'guidelines.html',
})
export class GuidelinesPage {
  segment: string = "acute";
  segment_footer: string = "g1f.png";

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.getSearchparams()
  }

  getSearchparams() {
    if (this.navParams.data)
      this.segment = this.navParams.data;
  }

  segmentChanged(event) {
    switch (this.segment) {
      case 'acute':
        this.segment_footer = "g1f.png";
        break;
      case 'gas':
        this.segment_footer = 'g2f.png';
      case 'community':
        this.segment_footer = 'g3f.png'
    }
  }

  generatemodal(col) {
    let modal = this.modalCtrl.create(TabeldetailsPage, { data: col });
    modal.present();
  }
  gotofooter() {
    this.navCtrl.push(RefrencesPage);
  }

}
