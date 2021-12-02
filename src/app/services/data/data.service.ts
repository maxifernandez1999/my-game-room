import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Encuesta } from 'src/app/models/encuesta';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 //user: any;
 dbUsersRef: AngularFirestoreCollection<any>;
 dbPuntosref:AngularFirestoreCollection<any>;
 itemCollecttion: AngularFirestoreCollection<Encuesta>;

 constructor( public authSrv: AngularFireAuth,private db: AngularFirestore /* private authService: AuthService */) {
   this.dbUsersRef = this.db.collection("usuarios");
   /*this.authSrv.authState.subscribe(user=>{
     if(user){
       this.user.name=user.displayName;
       this.user.email=user.email;
       this.user.id=user.uid;
     }
   });*/
 }

 getUsers() {
   return this.dbUsersRef.valueChanges();
 }

  getUserByUid(uid: string) {
   return this.dbUsersRef.doc(uid).valueChanges();
 }

 updatePuntaje(userUid, puntos) {
   console.info("puntajes updates", puntos); 
   return this.dbUsersRef.doc(userUid).update({
     puntajes: puntos
   })
 }

 savePuntaje(juego,usuario,puntuacion){
   let fecha = new Date();
   this.dbUsersRef.doc(usuario.uid).update({
     puntajes: usuario.puntajes
   })
   return this.db.collection(juego).add({
     'fecha': fecha.getDate() + '-' + (fecha.getMonth()+1) +  '-' +fecha.getFullYear(),
     'usuario':usuario,
     'puntuacion': puntuacion});
 }

 getPuntosByJuego(juego:string){
   let puntos;
   let turnosUfs =  this.db.collection(juego ,ref=>ref.orderBy('puntuacion','desc')).valueChanges();
   

  /* turnosUfs.docs.map(function(x){
     puntos.push(x.data());
   });*/
   return turnosUfs;  // this.db.collection(juego,ref=>ref.orderBy('puntuacion','desc'));
 }

 getEncuestas(): Observable<Encuesta[]> {
   return this.db.collection("encuestas").valueChanges() as Observable<Encuesta[]>;
 }


 GuardarEncuesta(encuesta:Encuesta){
   let fecha = new Date();
   return this.db.collection("encuestas").add({
      fecha: fecha.getDate() + '-' + (fecha.getMonth()+1) +  '-' +fecha.getFullYear(),
      email :encuesta.email,
      nombre: encuesta.nombre,
      apellido:encuesta.apellido,
      telefono:encuesta.telefono,
      edad:encuesta.edad,
      conocer:encuesta.conocer,
      juegoFav:encuesta.juegoFav,
      puntuacion:encuesta.puntuacion
   });
 } 
}
