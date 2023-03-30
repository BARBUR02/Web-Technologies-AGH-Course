import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {

  constructor(private firestore : AngularFirestore) {
   }

   getTripList(){
      return this.firestore.collection('trips').snapshotChanges();
   }
}
