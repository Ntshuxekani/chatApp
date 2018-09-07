
import { Component } from '@angular/core';
import {Alert,AlertController,Loading,LoadingController,
  IonicPage, NavController, } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
 


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  private load:Loading;
email:string;
password:string;

  constructor(public navCtrl: NavController, private loadingCtrl:LoadingController, private alertCtrl:AlertController, private authProvider:AuthProvider) {
  }

  goToSignUp():void {
    this.navCtrl.push('SignUpPage');
  }
signUp(){
  if(!this.email && !this.password){
  console.log('Enter email and address')
  }else{
    this.authProvider.signUpUser(this.email, this.password)
    .then(authData=>{
      this.load.dismiss().then(()=>{
    this.navCtrl.setRoot('RoomsPage');
      })
    },error=>{
      this.load.dismiss().then(()=>{
        const alert :Alert = this.alertCtrl.create({
          message:error.message,
          buttons:[{text:'ok',role: 'cancel'}]
        })
        alert.present();
      })
    })
    this.load=this.loadingCtrl.create();
    this.load.present()
    }
  } 

}
