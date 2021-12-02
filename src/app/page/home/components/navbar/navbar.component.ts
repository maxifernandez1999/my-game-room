import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAdmin:string;
  constructor(private rutas: Router, private auth: UsersService) {}

  ngOnInit(): void {
    this.isAdmin = JSON.parse(localStorage.getItem('user')).perfil;
  }
  logOut() {
    this.auth.logOut().then((log) => {
      localStorage.clear();
      this.rutas.navigate(['login']);
    });
  }
  public redirect(el: string): void {
    switch (el) {
      case 'resultados':
        this.rutas.navigate(['resultados'])
        break;
      case 'hangman':
        this.rutas.navigate(['hangman']);
        break;
      case 'mayormenor':
        this.rutas.navigate(['majmin']);
        break;
      case 'treasure':
        this.rutas.navigate(['treasure']);
        break;
      case 'preguntados':
          this.rutas.navigate(['preguntados']);
        break;
      case 'chat':
        this.rutas.navigate(['chat']);
        break;
      case 'encuesta':
        this.rutas.navigate(['encuesta']);
        break;
      case 'quien':
        this.rutas.navigate(['quien-soy']);
        break;
        case 'result':
        this.rutas.navigate(['result']);
        break;

      default:
        break;
    }
  }
}
