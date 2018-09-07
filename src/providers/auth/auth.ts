
import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


@Injectable()
export class AuthProvider {

  constructor() {
    
  }
signIn(email:string,password:string):Promise<any>{
  return firebase.auth().signInWithEmailAndPassword(email,password);
}
signOut():Promise<any> {
  const userId:string = firebase.auth().currentUser.uid;
  firebase.database().ref(`/userProfile/${userId}`).off();
  return firebase.auth().signOut();
}
resetPassword(email:string):Promise<any>{
  return firebase.auth().sendPasswordResetEmail(email);
}

  signUpUser(email:string,password:string):Promise<any>{
    return firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(newUserCredentials=>{
     firebase.database().ref(`/userProfile/${newUserCredentials.user.uid}/email`)
     .set(email);
    }).catch(error=>{
      throw new Error(error);
    })
  }

}
