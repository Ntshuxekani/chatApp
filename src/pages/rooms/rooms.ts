import { ProfileProvider } from './../../providers/profile/profile';
import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { ChatRoomsProvider } from './../../providers/chat-rooms/chat-rooms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html',
})
export class RoomsPage {
name:string;
userProfile:any;
chatRoomsList:Array<any>
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private chatRooms:ChatRoomsProvider,private alertCtrl:AlertController,private authProvider:AuthProvider,private profile:ProfileProvider) {
  }
  joinRoom(key){
    console.log(this.userProfile);
    if(!this.userProfile.hasOwnProperty('firstName') || !this.userProfile.hasOwnProperty('lastName')){
    let alert :Alert = this.alertCtrl.create({
      message: 'You need to update your profile before entering the chat room',
      buttons: [{
        text: 'cancel',
        role: 'cancel',

      }, {
        text: 'update profile',
        handler: data => {
          this.navCtrl.push('ProfilePage')
        }
      }]
    })
    alert.present();

  } else {
    this.navCtrl.setRoot(HomePage,{'key':key,'userProfile':this.userProfile})
    }
   
}
  ionViewCanEnter(){
    
   this.chatRooms.getChatRoomList().off()
  }

  ionViewWillEnter(){
   
  
   this.chatRooms.getChatRoomList().on('value', chatRoomsListSnapShot =>{
this.chatRoomsList=[];
chatRoomsListSnapShot.forEach(snap =>{
  this.chatRoomsList.push({
    id:snap.key,
    name:snap.val().chatRoomName
  });
  return false;
})
   })
   this.profile.getUserProfile().on('value',userProfileSnapShot=>{
    this.userProfile =userProfileSnapShot.val();
    console.log("profile",this.userProfile)
    
   })
  }

  createRoom(){
    let alert:Alert=this.alertCtrl.create({
      message:'Please enter a room name?',
      inputs:[{
        name:'roomname',
        placeholder:'Room Name'
      }],
      buttons:[{
        text: 'cancel',
        role: 'cancel',

      },
      {
        text:'create Room',
        handler:data=>{
          console.log(data.roomname)
        this.chatRooms.createRoom(data.roomname).then(newChatRoom =>{
          console.log(newChatRoom)
        },)  
      }
      }]
})
alert.present();
}
  logout(){
    this.authProvider.signOut().then(() => {
    this.navCtrl.setRoot('LoginPage')
    })
  }
    goToProfile(){
      this.navCtrl.push('ProfilePage')
    }
}
