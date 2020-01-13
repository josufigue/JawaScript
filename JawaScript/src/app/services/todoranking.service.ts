import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskI } from '../models/task.interface'

@Injectable({
  providedIn: 'root'
})
export class TodorankingService {
  private rankingCollection: AngularFirestoreCollection<TaskI>;
  private ranking: Observable<TaskI[]>;

  constructor(db: AngularFirestore) {
    this.rankingCollection = db.collection<TaskI>('ranking');
    this.ranking = this.rankingCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return{id, ...data};
        });
      }
    ));
   }

    getAllRanking(){
      return this.ranking;
    }
    getRanking(id: string){
      return this.rankingCollection.doc<TaskI>(id).valueChanges();
    }

    updateRanking(ranking:TaskI, id: string){
      return this.rankingCollection.doc(id).update(ranking)
    }

    addRanking(ranking: TaskI){
      return this.rankingCollection.add(ranking);
    }
    
    remove(id: string){
      return this.rankingCollection.doc(id).delete();
    }
  }
