import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  users: User[] = [];
  nameUser:string;
  passwordSignIn: any = '';
  emailSignIn: any = '';

  isRegisterSignUp: boolean = false;
  isRegisterSignIn: boolean = false;

  nameSignUp: any = '';
  emailSignUp: any = '';
  passwordSignUp: any = '';

  @ViewChild('asContainer') container: any;
  @ViewChild('asMessage') message: any;
  @ViewChild('asSpinner') spinner: any;
  @ViewChild('message') messageH3: any;

  constructor(
    private renderer2: Renderer2,
    private rutas: Router,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    //obtiene los datos de la base en formato de array
    this.userService.getUsers().subscribe((users) => {
      users.forEach((user) => {
        this.users.push(user);
      });
    });
    console.log(this.users);
  }
  login() {
    console.log(this.emailSignIn)
    this.userService
      .login(this.emailSignIn, this.passwordSignIn)
      .then(() => {
        this.existSignIn();
        let user: any = {
          email: this.emailSignIn,
          password: this.passwordSignIn,
          name: this.nameUser
        };
        localStorage.setItem('user', JSON.stringify(user));
        this.rutas.navigate(['home']);
      })
      .catch((error) => {
        this.ShowSpinner();
        const elementMessage = this.message.nativeElement;
        this.createMessage(
          'No pudimos encontrar su usuario. Intente de nuevo o registrese!'
        );
        this.renderer2.addClass(elementMessage, 'visible');
      });
  }
  async signIn() {
    this.existSignIn();
    this.showMessageNotRegister();
  }
  existSignIn() {
    this.users.forEach((user) => {
      if (
        user.email == this.emailSignIn &&
        user.password == this.passwordSignIn
      ) {
        this.isRegisterSignIn = true;
        this.nameUser = user.name;
      }
    });
  }
  existSignUp() {
    if (
      this.nameSignUp != '' &&
      this.emailSignUp != '' &&
      this.passwordSignUp != ''
    ) {
      this.users.forEach((user) => {
        if (
          user.email == this.emailSignUp &&
          user.password == this.passwordSignUp
        ) {
          this.isRegisterSignUp = true;
        }
      });
    } else {
      this.isRegisterSignUp = true;
    }
  }
  ShowSpinner() {
    const elementSpinner = this.spinner.nativeElement;
    setTimeout(() => {
      this.renderer2.setStyle(elementSpinner, 'display', 'none');
    }, 2000);
    this.renderer2.setStyle(elementSpinner, 'display', 'block');
  }
  register() {
    this.userService
      .register(this.emailSignUp, this.passwordSignUp)
      .then(() => {
        const date: Date = new Date();
        let dateFormat: string = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
        let user: any = {
          name: this.nameSignUp,
          password: this.passwordSignUp,
          email: this.emailSignUp,
          fechaIngreso: dateFormat,
        };
        this.userService.addUser(user).then(() => {
          localStorage.setItem('user', JSON.stringify(user));
          this.rutas.navigate(['home']);
        });
      })
      .catch((error) => {
        console.log(error);
        this.ShowSpinner();
        const elementMessage = this.message.nativeElement;
        this.createMessage('El usuario ya existe! Pruebe con iniciar sesion');
        this.renderer2.addClass(elementMessage, 'visible');
      });
  }

  accessFast(): void {
    this.emailSignIn = 'maxi@gmail.com';
    this.passwordSignIn = '123456';
  }
  signUp() {
    this.existSignUp();
    this.showMessageExist();
  }
  createMessage(message: string) {
    const elementMessage = this.messageH3.nativeElement;
    this.renderer2.setProperty(elementMessage, 'innerHTML', message);
  }
  showMessageExist() {
    if (this.isRegisterSignUp == true) {
      this.ShowSpinner();
      const elementMessage = this.message.nativeElement;
      this.createMessage('El usuario ya existe! Pruebe con iniciar sesion');
      this.renderer2.addClass(elementMessage, 'visible');
    } else {
      const date: Date = new Date();
      let dateFormat: string = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
      this.userService.addUser({
        name: this.nameSignUp,
        password: this.passwordSignUp,
        email: this.emailSignUp,
        fechaIngreso: dateFormat,
      });
      this.rutas.navigate(['home']);
    }
  }
  showMessageNotRegister() {
    if (this.isRegisterSignIn == false) {
      this.ShowSpinner();
      this.createMessage(
        'No pudimos encontrar su usuario. Intente de nuevo o registrese!'
      );
      const elementMessage = this.message.nativeElement;
      this.renderer2.addClass(elementMessage, 'visible');
    } else {
      this.rutas.navigate(['home']);
    }
  }

  signUpButton() {
    const elementContainer = this.container.nativeElement;
    this.renderer2.addClass(elementContainer, 'right-panel-active');
    console.log(this.container.nativeElement.value);
  }
  signInButton() {
    const elementContainer = this.container.nativeElement;
    this.renderer2.removeClass(elementContainer, 'right-panel-active');
  }
}
