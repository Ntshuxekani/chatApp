import 'firebase/database';
import  firebase  from 'firebase/app';
import { Injectable } from '@angular/core';

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {
chatRef:firebase.database.Reference
  constructor() {
    firebase.auth().onAuthStateChanged(user=>{
      if (user) {
        this.chatRef=firebase.database().ref(`userProfile/${user.uid}/chatRooms/chats`).push()
      }
    })

  }
startChart(data){
  this.chatRef.set(data)
}
getChats():firebase.database.Reference{
  return this.chatRef
}
}
