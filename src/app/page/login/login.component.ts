import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users:User[] = [];

  passwordSignIn:any = '';
  emailSignIn:any = '';

  isRegister:boolean = false;

  nameSignUp:any;
  emailSignUp:any;
  passwordSignUp:any;

  @ViewChild('asContainer') container:any;
  @ViewChild('asMessage') message:any;
  @ViewChild('asSpinner') spinner:any;
  @ViewChild('message') messageH3:any;

  constructor(private renderer2:Renderer2,
              private rutas:Router,
              private userService: UsersService
              ) { }

  ngOnInit(): void {
    //obtiene los datos de la base en formato de array
    this.userService.getUsers().subscribe(users => {
      users.forEach(user => {
        this.users.push(user);
      });
    });
    console.log(this.users);
   }

  signIn(){
    this.existSignIn();
    this.showMessageNotRegister();
  }
  existSignIn(){
    this.users.forEach(user => {
      if (user.email == this.emailSignIn
        && user.password == this.passwordSignIn) {
          this.isRegister = true;
      }
    });
  }
  existSignUp(){
    this.users.forEach(user => {
      if (user.email == this.emailSignUp
        && user.password == this.passwordSignUp) {
          this.isRegister = true;
      }
    });
  }
  ShowSpinner(){
      const elementSpinner = this.spinner.nativeElement;
      setTimeout(()=>{ 
        this.renderer2.setStyle(elementSpinner,'display','none');
      }, 2000);
      this.renderer2.setStyle(elementSpinner,'display','block');    
  }
  signUp(){
    this.existSignUp();
    this.showMessageExist();

  }
  createMessage(message:string){
    const elementMessage = this.messageH3.nativeElement;
    this.renderer2.setProperty(elementMessage,'innerHTML',message);
  }
  showMessageExist(){
    if (this.isRegister == true) {
      this.ShowSpinner();
      const elementMessage = this.message.nativeElement;
      this.createMessage('El usuario ya existe! Pruebe con iniciar sesion')
      this.renderer2.addClass(elementMessage,"visible"); 
    }else{
      const date:Date = new Date();
      let dateFormat:string = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
      this.userService.addUser({
        name: this.nameSignUp,
        password: this.passwordSignUp,
        email: this.emailSignUp,
        fechaIngreso: dateFormat
      });
      this.rutas.navigate(['home']);
    }
  }
  showMessageNotRegister(){
    if (this.isRegister == false) {
      this.ShowSpinner();
      const elementMessage = this.message.nativeElement;
      this.renderer2.addClass(elementMessage,"visible"); 
    }else{
      this.rutas.navigate(['home']);
    }
  }
  
  signUpButton(){
    const elementContainer = this.container.nativeElement;
    this.renderer2.addClass(elementContainer,"right-panel-active");
    console.log(this.container.nativeElement.value);
  }
  signInButton(){
    const elementContainer = this.container.nativeElement;
    this.renderer2.removeClass(elementContainer,"right-panel-active");
  }

}
