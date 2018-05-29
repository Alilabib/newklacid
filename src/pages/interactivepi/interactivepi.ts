import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RefrencesPage } from '../refrences/refrences';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { TabeldetailsPage } from '../tabeldetails/tabeldetails';


@Component({
  selector: 'page-interactivepi',
  templateUrl: 'interactivepi.html',
})
export class InteractivepiPage {
  segment: string = "dosage"
  subsegment: string = "tablets"
  segment_footer = "g2f.png";
  tablets = "assets/icon/tablets.png";
  oral = "assets/icon/oral.png";
  intraventous = "assets/icon/intraventous.png";
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    this.getSearchparams()

  }

  getSearchparams() {
    if (this.navParams.data)
      this.segment = this.navParams.data;
  }

  changesubsegment(subsegment) {
    switch (subsegment) {
      case 'tablets':
        this.subsegment = "tablets"
        this.tablets = "assets/icon/tablets-active.png";
        this.oral = "assets/icon/oral.png";
        this.intraventous = "assets/icon/intraventous.png";
        break;

      case 'intraventous':
        this.subsegment = "intraventous"
        this.tablets = "assets/icon/tablets.png";
        this.oral = "assets/icon/oral.png";
        this.intraventous = "assets/icon/intraventous-active.png";
        break;

      case 'oral':
        this.subsegment = "oral"
        this.tablets = "assets/icon/tablets.png";
        this.oral = "assets/icon/oral-active.png";
        this.intraventous = "assets/icon/intraventous.png";
        break;
    }
  }
  gotofooter() {
    this.navCtrl.push(RefrencesPage);
  }

  generatemodal(col) {
    let modal = this.modalCtrl.create(TabeldetailsPage, { data: col });
    modal.present();
  }

}
