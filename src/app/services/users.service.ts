import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: Observable<any[]>;
  constructor(private firestore: AngularFirestore) { 
    this.users = this.firestore.collection('items').valueChanges();
  }

  getUsers(){
    return this.users;
  }

  addUser(data:any){
    this.firestore.collection('items').add(data);
  }
}
