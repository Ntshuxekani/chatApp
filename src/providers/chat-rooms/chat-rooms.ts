
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
/*
  Generated class for the ChatRoomsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatRoomsProvider {
private chatRoomListRef:firebase.database.Reference
  constructor() {
   firebase.auth().onAuthStateChanged(user=>{
     if(user){
      this.chatRoomListRef=firebase.database().ref(`/userProfile/chatRooms`)
     }
   })
  }
  createRoom(name:string):firebase.database.ThenableReference{
return this.chatRoomListRef.push({
  chatRoomName:name
})
  }
getChatRoomList():firebase.database.Reference{
  return this.chatRoomListRef;
}
}
