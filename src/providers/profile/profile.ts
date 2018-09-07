import 'firebase/database';
import firebase, { User } from 'firebase/app';
import { Injectable } from '@angular/core';


@Injectable()
export class ProfileProvider {
  currentUser:User;
userProfile: firebase.database.Reference

  constructor() {
    firebase.auth().onAuthStateChanged(user=>{
      
      if(user){
        this.currentUser=user;
        this.userProfile=firebase.database().ref(`userProfile/${user.uid}`)     
       }
    });
  }
getUserProfile():firebase.database.Reference{
return this.userProfile;
}
updateName(firstName:string, lastName: string):Promise<any> {
  return this.userProfile.update({ firstName, lastName })
}
updateDOB(birthdate: string): Promise<any> {
  return this.userProfile.update({birthdate})
}
updatePassword(newPassword:string,oldPassword:string):Promise<any>{
  const credentials: firebase.auth.AuthCredential=firebase.auth.EmailAuthProvider.
  credential(this.currentUser.email, oldPassword);
  return this.currentUser.reauthenticateWithCredential(credentials)
  .then(user => {
    this.currentUser.updatePassword(newPassword).then(user => {
      console.log('Password has been changed')
    })
  }).catch(error => {
    console.log(error);
  })
}
}
