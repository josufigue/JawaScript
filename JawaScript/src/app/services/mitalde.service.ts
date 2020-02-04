import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { taldea, partaideak } from '../models/task.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MitaldeService {
  private taldeakCollection: AngularFirestoreCollection<taldea>;
  private partaideakCollection: AngularFirestoreCollection<partaideak>;
  private taldeak: Observable<taldea[]>;
  constructor(db: AngularFirestore) { 
    this.taldeakCollection = db.collection<taldea>('taldeak');
    this.partaideakCollection = db.collection<partaideak>('taldeak');
    this.taldeak = this.taldeakCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const izena = a.payload.doc.id;
          return { izena, ...data };
        });
      }
    ));
  }
  getAlltaldeak() {
    return this.taldeak;
  }
  getPartaideak(taldea: string) {
    return this.taldeakCollection.doc<taldea>(taldea).collection('partaideak').valueChanges();
  }
  getTaldea(taldea: string) {
    return this.taldeakCollection.doc<taldea>(taldea).valueChanges();
  }

  updatetaldeak(taldea: partaideak, izena: string, userId: string) {
    return this.taldeakCollection.doc(izena).collection('partaideak').doc(userId).update(taldea)
  }

  addpartaideak(taldeak: partaideak, id: string, userId: string) {
    return this.taldeakCollection.doc(id).collection('partaideak').doc(userId).set(taldeak);
  }

  remove(id: string, userId: string) {
    return this.taldeakCollection.doc(id).collection('partaideak').doc(userId).delete();
  }
}