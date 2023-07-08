import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FirebaseAnalytics } from "@capacitor-community/firebase-analytics";
import { environment } from 'src/environments/environment';
import { Device } from '@capacitor/device';

// Init for the web
import "@capacitor-community/firebase-analytics";
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  analyticsEnabled = true;

  constructor( private router: Router) {
    this.initFb();
    this.router.events.subscribe((e)=>{
        if(e instanceof NavigationEnd){
          console.log('route changed: ', e.url);
          this.setScreenName(e.url)
        }
    });
   
  }

  async initFb() {
    if ((await Device.getInfo()).platform == 'web') {
      FirebaseAnalytics.initializeFirebase(environment.firebaseConfig);
    }
  }

  setUser() {
    // Use Firebase Auth uid
    FirebaseAnalytics.setUserId({
      userId: "Abhishek",
    }).then((res)=>{
      console.log(res);
      
    }).catch((err)=>{console.log(err);
    });
  }

  setProperty() {
    FirebaseAnalytics.setUserProperty({
      name: "framework",
      value: "angular",
    });
  }

  logEvent() {
    FirebaseAnalytics.logEvent({
      name: "payment",
      params: {
        method: "Cash On Delivery"
      }
    });
  }

  setScreenName(screenName:string) {
    console.log('route changed: ', screenName);
    FirebaseAnalytics.setScreenName({
      screenName
    });
  }

  toggleAnalytics() {
    this.analyticsEnabled = !this.analyticsEnabled;
    FirebaseAnalytics.setCollectionEnabled({
      enabled: this.analyticsEnabled,
    });
  }
}
