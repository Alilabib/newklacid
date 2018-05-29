import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AlertController, ToastController, LoadingController } from 'ionic-angular';


@Injectable()
export class ServiceProvider {
  apiA = "http://tech.techno-hat.com/klacid/api/";
  photo = "http://tech.techno-hat.com/klacid/upload/";
  obj: object = {};
  tokenStr = "token";
  remember ="remember_me";
  constructor(public loadingCtrl: LoadingController, public toastCtrl: ToastController, public http: Http, public alertCtrl: AlertController) {
  }
  saveAccessToken(access_token) {
      localStorage.setItem(this.tokenStr, access_token);
  }

  remember_me(access_token) {
    localStorage.setItem(this.remember, access_token);
}

  signOut() {
      localStorage.removeItem(this.tokenStr);
      localStorage.removeItem(this.remember);
  }

  get(url) {
      return new Promise(resolve => {
          this.http.get(this.apiA + url).map(res => res.json())
              .subscribe(success => {
                  this.obj = success
                  console.log(this.obj)
                  resolve(this.obj);
                  console.log(this.apiA+url)
              }, error => {
                  resolve(error);
                  console.log(error)
                  if(error.statusText=="Unauthorized"){
                  }
              }, () => {
              });
      });
  }

  post(url, data) {
      return new Promise(resolve => {
          this.http.post(this.apiA + url, data).map(res => res.json())
              .subscribe(success => {
                  resolve(success);

                  console.log(success)
                  console.log(this.apiA+url)
                  
              }, error => {
                  resolve(error);
                  console.log(error)

              }, () => {
              });
      });
  }



  showToast(msg) {
      let toast = this.toastCtrl.create({
          message: msg,
          duration: 5000,
          position: "top",
          showCloseButton : true,
          cssClass : "toast"
          
      });
      toast.present();
  }

  filterItems(searchTerm,items){
    if (searchTerm && searchTerm.trim() != '') {
    return items.filter((item) => {
        return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });    
    }
}

filterUsers(searchTerm,items){
    return items.filter((item) => {
        return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });    
}

  showalert(title, msg) {
      let alert = this.alertCtrl.create({
          title: title,
          subTitle: msg,
           cssClass: 'alert',
           buttons: ['Ok']
      });
      alert.present();
  }


}
