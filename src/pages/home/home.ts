import  firebase  from 'firebase/app';
import 'firebase/database';
import { ProfileProvider } from './../../providers/profile/profile';
import { AuthProvider } from './../../providers/auth/auth';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams,Content } from 'ionic-angular';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userProfile:any;
  chatRef:firebase.database.ThenableReference;
  @ViewChild(Content) content: Content;
  data={
    type:'',
    message:''
  }
  chats=[];
  email:string;
  roomKey: string;
  offStatus: boolean = false;
firebaseRef: firebase.database.Reference
  constructor(public navCtrl: NavController, private authProvider:AuthProvider,private proProvider: ProfileProvider,
    private navParams:NavParams) {
this.roomKey = this.navParams.get('key') as string;
this.userProfile=this.navParams.get('userProfile');
this.data.type="message";
this.chatRef=firebase.database().ref(`userProfile/chatRooms/${this.roomKey}/chats`).push()
console.log(this.userProfile);

let joinData ={
  type:'join',
  user:this.userProfile.firstName,
  message:this.userProfile.firstName+ 'Has joined this room',
  sendDate:Date()
}

this.chatRef.set(joinData);
this.data.message = '';


firebase.database().ref(`userProfile/chatRooms/${this.roomKey}/chats`).on('value',resp=>{
  this.chats = [];
  this.chats=snapShotToArray(resp);
  setTimeout(()=>{
    if(this.offStatus===false){
      this.content.scrollToBottom(300);
    }
  },1000)
  
})

  }
  sendMessage(){
    firebase.database().ref(`userProfile/chatRooms/${this.roomKey}/chats`).push()
    .set({
      type:this.data.type,
      user:this.userProfile.firstName,
      message: this.data.message,
      sendDate:Date()
    });
  }
  exitChat(){
let exitData = firebase.database().ref(`userProfile/chatRooms/${this.roomKey}/chats`).push()
exitData.set({
  type:'exit',
  user:this.userProfile.firstName,
  message:this.userProfile.firstName + 'has exited the room',
  sendDate:Date()
})

this.offStatus=true
this.navCtrl.setRoot('RoomsPage')
  }
  logout(){
this.authProvider.signOut().then(()=>{
this.navCtrl.setRoot('LoginPage')
})
  }
  ionViewDidLoad(){
 this.proProvider.getUserProfile().on('value',userProfileSnapShot =>{
 this.userProfile=userProfileSnapShot.val();
 this.userProfile.firstName=userProfileSnapShot.val().firstName
 this.userProfile.email=userProfileSnapShot.val().email
    })
   }
 
}
export const snapShotToArray = snapShot => {
  let returnArr = [];
  snapShot.forEach(childSnapshot => {
    let item = childSnapshot.val();
  returnArr.push(item)
  });
  console.log("array", returnArr);
  return returnArr;
}