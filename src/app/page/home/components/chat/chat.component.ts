import { Component,ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/services/chat/chat.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  message:any;
  constructor(private renderer2:Renderer2,
              private messageService: ChatService) { }

  @ViewChild('asChat') chat:any = "";

 

  ngOnInit(): void {
    this.messageService.getMessages().subscribe(messages => {
      let innerHTML:string = "";
      messages.forEach(msj => {
        let message: string = msj.payload.val().message;
        let sendTime: string = msj.payload.val().sendTime;
        let name: string = msj.payload.val().name;
        // this.messages.push(message);
        innerHTML += `<p class="whisper"><b>${sendTime} ${name}</b>: ${message}</p>`;
      });
      this.DeleteMessage();
      this.ShowMessage(innerHTML);
    });
    
  }
 
  DeleteMessage(){
    const elementChat = this.chat.nativeElement;
    this.renderer2.setProperty(elementChat,"innerHTML","");
  }
  
  ShowMessage(data:string){
    const elementChat = this.chat.nativeElement;
    this.renderer2.setProperty(elementChat,"innerHTML",data);
  }
  SendMessage(){
    console.log(this.message);
    let time:Date = new Date();
    this.messageService.addMessage({
      message: this.message,
      sendTime:  `${time.getDate()}/
                  ${time.getMonth()+1}/
                  ${time.getFullYear()} - 
                  ${time.getHours()}:
                  ${time.getMinutes()}:
                  ${time.getSeconds()}`,
      // name: (UsersService.email != null) ? UsersService.email : "usuario no registrado"
    });
    // this.ShowMessage(this.message);
  }
  
    
   

}
