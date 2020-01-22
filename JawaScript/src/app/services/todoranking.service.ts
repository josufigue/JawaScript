import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { rankingTask } from '../models/task.interface'

@Injectable({
  providedIn: 'root'
})
export class TodorankingService {
  private rankingCollection: AngularFirestoreCollection<rankingTask>;
  private ranking: Observable<rankingTask[]>;

  constructor(db: AngularFirestore) {
    this.rankingCollection = db.collection<rankingTask>('ranking', ref => ref.orderBy('Puntuazioa', 'desc'));
    this.ranking = this.rankingCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }
    ));
  }

  getAllRanking() {
    return this.ranking;
  }

  getRanking(id: string) {
    return this.rankingCollection.doc<rankingTask>(id).valueChanges();
  }

  updateRanking(ranking: rankingTask, id: string) {
    return this.rankingCollection.doc(id).update(ranking)
  }

  addRanking(ranking: rankingTask, id: string) {
    return this.rankingCollection.doc(id).set(ranking);
  }

  remove(id: string) {
    return this.rankingCollection.doc(id).delete();
  }
}
