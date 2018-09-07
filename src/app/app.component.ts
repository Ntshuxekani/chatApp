
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as firebase from 'firebase';
const config = {
  apiKey: "AIzaSyBI_xCC8rnZnkEXyfoD8epJbvzpZn-xmVw",
  authDomain: "my-first-firebase-projec-c0434.firebaseapp.com",
  databaseURL: "https://my-first-firebase-projec-c0434.firebaseio.com",
  projectId: "my-first-firebase-projec-c0434",
  storageBucket: "my-first-firebase-projec-c0434.appspot.com",
  messagingSenderId: "573408621603"
}; 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any 

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
    const unsubscribe = firebase.auth().onAuthStateChanged(user=>{
      if(!user){
        this,this.rootPage='LoginPage'
        unsubscribe();
      }else{
        this.rootPage='RoomsPage'
        unsubscribe();
      }
    })
  }
}

