import { ProfileProvider } from './../../providers/profile/profile';
import { Component } from '@angular/core';
import { Alert, AlertController,IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
userProfile:any;

birthDate:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private proProvider: ProfileProvider, private alertCtrl: AlertController) {
  }

  ionViewCanEnter(){
   this.proProvider.getUserProfile().off()
  }
  ionViewDidLoad(){
   this.proProvider.getUserProfile().on('value',userProfileSnapShot =>{
this.userProfile=userProfileSnapShot.val();
this.birthDate=userProfileSnapShot.val().birthDate;
console.log(this.birthDate);
   })
  }
  updateDOB(birthDate){
    this.proProvider.updateDOB(birthDate);
      }
  updateName(){
  const alert: Alert = this.alertCtrl.create({
    message: 'Your first name and last name',
    inputs:[{
      name:'firstName',
      placeholder:'Enter your first name',
      value:this.userProfile.firstName
    },{
      name:'lastName',
      placeholder:'Enter your lastName',
      value:this.userProfile.lastName
      
    }],
    buttons: [{
      text: 'cancel'
    },{
      text:'Save',
      handler: data =>{
        this.proProvider.updateName(data.firstName, data.lastName)
      }
    
    }]
  })
  alert.present()
  }

updatePassword(){
  const alert: Alert = this.alertCtrl.create({

    inputs: [{
      name:'oldPassword',
      placeholder: 'Enter old password',
      type: 'password'

    },{
      name:'newPassword',
      placeholder:'Enter your new password',
      type: 'password'

    }],
    buttons:[{
      text: 'cancel'
    },{
        text: 'Save',
        handler: data =>{
          this.proProvider.updatePassword(data.newPassword, data.oldPassword)
          .catch(err =>{
            console.log('Error message from catch:', err.message)
            let newAlert:Alert=this.alertCtrl.create({
              message:err.message
            })
            newAlert.present();
          })
        }
      
    }]
  
  })
  alert.present()
}


}
