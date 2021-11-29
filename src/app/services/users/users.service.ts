import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: Observable<any[]>;
  
  constructor(private firestore: AngularFirestore, private auth:AngularFireAuth) { 
    this.users = this.firestore.collection('users').valueChanges();
    this.auth.authState.subscribe(user => {
      console.log(user);
    });
  }

  login(user:string,password:string){
    return this.auth.signInWithEmailAndPassword(user,password);
  }

  logOut(){
    return this.auth.signOut();
  }
  getUsers(){
    return this.users;
  }

  register(user:string,password:string){
    
    return this.auth.createUserWithEmailAndPassword(user,password);
    
  }
  public addUser(user:any):Promise<any>{
    return this.firestore.collection('users').add({...user});
  }
}
