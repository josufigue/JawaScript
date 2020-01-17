import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { rankingTask } from '../models/task.interface'

@Injectable({
  providedIn: 'root'
})
export class ErabiltzaileakService {

  private erabiltzaileCollection: AngularFirestoreCollection<rankingTask>;
  private erabiltzaile: Observable<rankingTask[]>;

  constructor(db: AngularFirestore) {
    this.erabiltzaileCollection = db.collection<rankingTask>('ranking');
    this.erabiltzaile = this.erabiltzaileCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return{id, ...data};
        });
      }
    ));
   }

    getAllErabiltzaile(){
      return this.erabiltzaile;
    }

    getErabiltzaile(id: string){
      return this.erabiltzaileCollection.doc<rankingTask>(id).valueChanges();
    }

    updateRanking(ranking:rankingTask, id: string){
      return this.erabiltzaileCollection.doc(id).update(ranking)
    }

    addErabiltzaile(ranking: rankingTask){
      return this.erabiltzaileCollection.add(ranking);
    }
    
    remove(id: string){
      return this.erabiltzaileCollection.doc(id).delete();
    }
  }
