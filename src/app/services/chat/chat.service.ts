import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  messages: Observable<any[]>;
  constructor(private firebase: AngularFireDatabase) {
    this.messages = this.firebase.list("messages").snapshotChanges(["child_added"]);
    
  }
  getMessages(){
    return this.messages;
  }

  addMessage(data:any){
    this.firebase.list("messages").push(data);
  }
}
