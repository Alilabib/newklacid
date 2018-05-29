import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, NavParams, Events, ActionSheetController, Content } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { LoginPage } from '../login/login';
import { PhotoViewer } from '@ionic-native/photo-viewer';


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  msg: any;
  user = this.navParams.data;
  data: any;
  messages = []
  loading: boolean;
  text: string
  loading_txt: boolean
  loading_attach: boolean;
  image: any;
  video: any;
  progress: any;
  uploading: boolean;
  @ViewChild(Content) content: Content;
  photourl = this.api.photo;
  attach: boolean
  next_page = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ServiceProvider, public events: Events, public camera: Camera, public actionSheetCtrl: ActionSheetController, private transfer: FileTransfer, private file: File, private photoViewer: PhotoViewer, public _zone: NgZone) {
    this.getdata();
  }

  showpic(image) {
    console.log(image)
    this.photoViewer.show(image);
  }

  @ViewChild('myInput') myInput: ElementRef;
  resize() {
    var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
    this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }


  getdata() {
    this.loading = true;
    let url = "get/messages?api_token=" + localStorage.getItem('token') + "&to_user=" + this.user.id + "&per_page=30";
    this.api.get(url).then(data => {
      this.data = data;
      if (this.data.statusText == "Unauthorized") {
        this.api.signOut();
        this.navCtrl.setRoot(LoginPage, '', { animate: true, animation: "ios-transitions" });
        this.api.showalert("Timeout", "Please sign in again")
      }
      this.next_page = this.data.result.next_page_url;
      this.data.result.data.forEach(element => {
        if (element.seen == 0) {
          if (element.from_user.id == this.user.id) { }
          else {
            let url1 = "update/seen/" + element.id + "?api_token=" + localStorage.getItem('token');
            this.api.get(url1).then(data => { });
          }
        }
        if (element.from_user.id == this.user.id) {
          element.position = 'left'
          element.senderName = element.from_user.name
        } else {
          element.position = 'right'
          element.senderName = element.to_user.name
        }
        if (element.seen * 1 == 0) {
          element.color = "light"
        } else {
          element.color = "primary"
        }
        element.time = element.created_at.slice(10)
      });
      this.messages = this.data.result.data;
      this.loading = false;
    })
  }





  sendmessage() {
    this.loading_txt = true;
    let url = "send/message?api_token=" + localStorage.getItem('token') + "&to_user=" + this.user.id + "&message=" + this.text;
    this.api.post(url, this.text).then(data => {
      this.loading_txt = false;
      this.data = data;
      if (this.data.status) {
        this.text = '';
        this.getdata()

      } else {
        this.api.showalert("", this.data.message)
      }
    })
  }

  getAttach() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Media type',
      buttons: [
        {
          text: 'Import video',
          handler: () => {
            let options: CameraOptions = {
              quality: 100,
              destinationType: this.camera.DestinationType.FILE_URI,
              sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
              mediaType: this.camera.MediaType.VIDEO,
            }
            this.camera.getPicture(options).then(data => {
              this.video = data;
              this.uploadAttach('video')
            })

          }
        },
        {
          text: 'Import image',
          handler: () => {
            let options: CameraOptions = {
              quality: 100,
              destinationType: this.camera.DestinationType.FILE_URI,
              encodingType: this.camera.EncodingType.JPEG,
              sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
              mediaType: this.camera.MediaType.PICTURE
            }

            this.camera.getPicture(options).then(data => {
              this.image = data;
              this.uploadAttach('image')

            })

          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });

    actionSheet.present();
  }




  uploadAttach(type) {
    const fileTransfer: FileTransferObject = this.transfer.create()
    let options: FileUploadOptions = {};
    let file;
    let url = "send/message?api_token=" + localStorage.getItem('token') + "&to_user=" + this.user.id;
    this.uploading = true;
    if (type == "image") {
      options = {
        fileKey: 'photo',
        fileName: 'file.jpg',
        mimeType: 'multipart/form-data',
        chunkedMode: false,

      }
      file = this.image;
    } else {
      options = {
        fileKey: 'video',
        fileName: 'file.mp4',
        chunkedMode: false,
        mimeType: 'multipart/form-data',


      }
      file = this.video;
    }

    fileTransfer.upload(file, this.api.apiA + url, options, true)
      .then((data) => {
        this.uploading = false;
        this.image = null;
        this.video = null;
        this.progress = 100;
        this.getdata()
        this.api.showToast("Uploading successfull")
      }, (err) => {
        this.api.showalert("", JSON.stringify(err))
        this.api.showToast("failed")
        this.uploading = false;
      })

    fileTransfer.onProgress((e) => {
      this._zone.run(() => {
        this.progress = (e.lengthComputable) ? Math.round(e.loaded / e.total * 100) : -1;
      })
    });

  }

  doRefresh(refresher) {
    this.getdata()
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    if (this.next_page) {

      this.api.get(this.next_page.slice(25)).then(data => {
        this.data = data;
        this.next_page = this.data.result.next_page_url;
        this.data.result.data.forEach(element => {
          if (element.seen == 0) {
            let url1 = "update/seen/" + element.id + "?api_token=" + localStorage.getItem('token');
            this.api.get(url1).then(data => { });
          }
          if (element.from_user.id == this.user.id) {
            element.position = 'left'
            element.senderName = element.from_user.name
          } else {
            element.position = 'right'
            element.senderName = element.to_user.name
          }
          if (element.seen * 1 == 0) {
            element.color = "light"
          } else {
            element.color = "primary"
          }
          element.time = element.created_at.slice(10)

        });
        this.messages.push(this.data.result.data);
        infiniteScroll.complete();
      })
    }
  }
}
