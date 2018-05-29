import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatPage } from '../chat/chat';
import { ServiceProvider } from '../../providers/service';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-thelounge',
  templateUrl: 'thelounge.html',
})
export class TheloungePage {
  users = [];
  data: any;
  loading: boolean;
  search: string;
  notsearched = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ServiceProvider) {
    this.getdata()
  }
  getdata() {
    this.loading = true;
    this.api.get("get/user/list?api_token=" + localStorage.getItem('token')).then(data => {
      this.data = data;
      if (this.data.statusText == "Unauthorized") {
        this.api.signOut();
        this.navCtrl.setRoot(LoginPage, '', { animate: true, animation: "ios-transitions" });
        this.api.showalert("Timeout", "Please sign in again")
      }
      this.users = this.data.result.data
      this.notsearched = this.data.result.data;
      this.loading = false;
    }).catch(err => {
      console.log(err);
    })
  }


  gotochat(user) {
    this.navCtrl.push(ChatPage, user);
  }

  onInput() {
    this.users = this.api.filterUsers(this.search, this.notsearched);
  }


}
