import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset',
  templateUrl: 'reset.html',
})
export class ResetPage {
  email:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private authProvider:AuthProvider,private alertCtrl:AlertController) {
  }

resetPassword(){
  if(!this.email){
    console.log('enter email')
  }else{
    this.authProvider.resetPassword(this.email).then(user=>{
      const alert:Alert= this.alertCtrl.create({
        message:'Check your email for the reset password link',
        buttons:[{
          text:'ok',
          role:'cancel',
          handler:()=>{
            this.navCtrl.pop()
          }
        }]
      })
      alert.present()
    },error=>{
      const errorAlert=this.alertCtrl.create({
        message:error.message,
        buttons:[{
          text:'ok',
          role:'cancel'
        }]
      })
    }
  )
  }
}

}
