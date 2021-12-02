import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Score } from 'src/app/models/score';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private db: AngularFirestore) { }

  saveScore(data:any,score:number, game:string){
    let fecha = new Date();
    return this.db.collection("scores").add({
       date: fecha.getDate() + '-' + (fecha.getMonth()+1) +  '-' +fecha.getFullYear(),
       email :data.email,
       name: data.name,
       score: score,
       game: game
    });
  }
    public getScores():Observable<Score[]>{
      return this.db.collection("scores").valueChanges() as Observable<Score[]>;
    }
}
