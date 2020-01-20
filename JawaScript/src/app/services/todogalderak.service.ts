import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { gald } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TodogalderakService {
  private galderakCollection: AngularFirestoreCollection<gald>;
  private galderak: Observable<gald[]>;

  constructor(db: AngularFirestore) {
    this.galderakCollection = db.collection<gald>('galderak');
    this.galderak = this.galderakCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));
  }

  getAllGalderak() {
    return this.galderak;
  }
  getGalderak(Galdera: string) {
    return this.galderakCollection.doc<gald>(Galdera).valueChanges();
  }

  updateGalderak(galderak: gald, id: string) {
    return this.galderakCollection.doc(id).update(galderak)
  }

  addGalderak(galderak: gald) {
    return this.galderakCollection.add(galderak);
  }

  remove(id: string) {
    return this.galderakCollection.doc(id).delete();
  }
}
