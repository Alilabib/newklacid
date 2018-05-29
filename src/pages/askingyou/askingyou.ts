import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service';

@Component({
  selector: 'page-askingyou',
  templateUrl: 'askingyou.html',
})
export class AskingyouPage {
  data: any;
  loading: boolean;
  questions = [];
  content_head: string;
  answers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ServiceProvider) {
    this.getquestions()
  }

  getquestions() {
    this.loading = true;
    this.api.get("asking/you?api_token=" + localStorage.getItem('token')).then(data => {
      this.data = data;
      this.questions = this.data.result.questions_answers;
      this.answers = this.questions
      this.content_head = this.data.result.content_head;
      this.loading = false;
    })
  }

  mcqAnswer(answer) {
    this.answers.forEach(element => {
      //  element.answers = null;
      if (element.id === answer.question_id * 1) {
        element.answer = answer;
      }
    })
  }

  submit() {
    let flag = false;
    let url = "";
    this.answers.forEach(element => {
      if (!element.answer) {
        this.api.showalert("", "You must answer all questions");
      } else {
        flag = true;
        this.loading = true;
        url = url + "answer_id[]=" + element.answer.id + "&";
      }
    })
    if (flag) {
      url = "add/answer?api_token=" + localStorage.getItem('token') + "&" + url;
      url = url.substring(0, url.length - 1);
      this.api.post(url, "").then(data => {
        this.data = data;
        this.loading = false;
        this.api.showToast(this.data.message)
      })
    }
  }


}
