import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { User } from '../shared/user.class';

import { Toast } from '@ionic-native/toast/ngx';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLogged: any = false;

  constructor(public afAuth: AngularFireAuth, private toastController: ToastController) {
    afAuth.authState.subscribe( user => (this.isLogged = user));
   }

   // login
   async  onLogin (user:User){
     try{
       return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
     }
     catch (error){
        console.log("Error on login", error);

        this.showToast(error);
     }
   }


   // register
   async onRegister(user:User){
    try{
      return await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
    }
    catch(error){
      console.log("Error on register", error);

      this.showToast(error);
    }
   }

   async showToast(error) {

    var errorea = "";
    console.log(error.message);
    switch(error.message){
      case 'signInWithEmailAndPassword failed: First argument "email" must be a valid string.':
        errorea = 'Sartutako emaila ezin da hutsik egon';
        break;
      case 'signInWithEmailAndPassword failed: Second argument "password" must be a valid string.':
        errorea = 'Sartutako pasahitza ezin da hutsik egon';
        break;
      case 'The email address is badly formatted.':
        errorea = 'Sartutako emaila ez dago ondo idatzita';
        break;
      case 'There is no user record corresponding to this identifier. The user may have been deleted.':
        errorea = 'Sartutako emaila ez da existitzen';
        break;
      case 'The password is invalid or the user does not have a password.':
        errorea = 'Pasahitza okerra da';
        break;
      case 'createUserWithEmailAndPassword failed: First argument "email" must be a valid string.':
        errorea = 'Sartutako emaila ezin da hutsik egon';
        break;
      case 'createUserWithEmailAndPassword failed: Second argument "password" must be a valid string.':
        errorea = 'Sartutako pasahitza ezin da hutsik egon';
        break;
      case 'Password should be at least 6 characters':
        errorea = 'Sartutako pasahitza 6 karakterekoa izan behar da gutxienez';
        break;
    }
    const toast = await this.toastController.create({
      message:  errorea,
      duration: 1000,
      position: "middle",
    });
    toast.present();
  }
}
