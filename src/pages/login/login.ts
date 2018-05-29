import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { HomePage } from '../home/home';
import { ServiceProvider } from '../../providers/service';
import { SplashScreen } from '@ionic-native/splash-screen';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  loading: boolean;
  login = {
    username: "",
    passoword: ""
  }
  data: any;
  remember_me: false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public menuCtrl: MenuController, public api: ServiceProvider, public splashScreen: SplashScreen) {
    this.menuCtrl.enable(false, "1");
  }

  loginForm: FormGroup;
  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(this.login.username, Validators.required),
      'password': new FormControl(this.login.passoword, Validators.required),
      'remember_me': new FormControl(this.remember_me),
    })
  }



  submit() {
    if (!this.loginForm.invalid) {
      this.loading = true;
      let url = "login/basic?username=" + this.loginForm.controls.username.value + "&password=" + this.loginForm.controls.password.value
      this.api.post(url, "").then(data => {
        this.data = data;
        this.loading = false;
        if (this.data.message) {
          this.api.showalert("", this.data.message)
        }
        if (this.data.status) {
          this.api.saveAccessToken(this.data.api_token)
          if (this.loginForm.get('remember_me').value) {
            this.api.remember_me("yes")
          }
          this.navCtrl.setRoot(HomePage, '', { animation: 'ios-transition', animate: true, direction: 'forward' });
          this.menuCtrl.enable(true, "1");
        }
      })
    } else {
      this.loading = false;
      this.loginForm.controls.username.markAsTouched();
      this.loginForm.controls.password.markAsTouched();
    }

  }

  // signup() {
  //   let modaloptions: ModalOptions = {
  //     enableBackdropDismiss: false,
  //   }
  //   let profileModal = this.modalCtrl.create(SignupPage, modaloptions);
  //   profileModal.present();
  // }

  forgetpass() {
    let alert = this.alertCtrl.create({
      title: 'Forget Password',
      inputs: [
        {
          name: 'Email',
          placeholder: 'Enter Your Email',
          type: 'email'
        },

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            let url = "reset/password?reset=" + data.Email;
            this.api.post(url, "").then(data => {
              this.data = data;
              this.api.showalert("", this.data.message)
            })
          }
        }
      ]
    });
    alert.present();
  }

}
