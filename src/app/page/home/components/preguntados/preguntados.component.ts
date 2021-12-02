import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api/api.service';
import { DataService } from 'src/app/services/data/data.service';
import { ScoreService } from 'src/app/services/score/score.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss'],
})
export class PreguntadosComponent implements OnInit {
  enJuego: boolean = false;
  contadorAciertos: number = 0;
  contadorPuntos: number = 0;
  user: any;
  save: boolean = false;
  juegoOff: boolean;

  //agregados
  paises = [];
  paisesTodos;
  paisActual;
  // puntuacion;

  constructor(
    private toastr: ToastrService,
    /* private authService: AuthService, */
    private dataService: DataService,
    private fire: AngularFireAuth,
    private apiService: ApiService,
    private scoreService: ScoreService
  ) {}

  ngOnInit(): void {
    // this.getCurrentUser();
    setTimeout(() => {}, 100);

    this.apiService.ObtenerPaises().subscribe((paises: any) => {
      this.contadorPuntos = 0;
      this.paisesTodos = paises;
    });
  }

  iniciarJuego() {
    this.paisActual = null;
    this.paises = [];
    for (let i = 0; i < 4; i++) {
      var numero = Math.floor(Math.random() * (249 - 0) + 0);
      if (i == 0) {
        this.paisActual = this.paisesTodos[numero];
      }
      this.paises.push(this.paisesTodos[numero]);
    }
    console.log(this.paisActual);
  }

  nuevo() {
    this.contadorPuntos = 0;
    this.save = false;
    this.enJuego = true;
    this.iniciarJuego();
  }

  elegir(id) {
    if (this.paises[id] == this.paisActual) {
      console.log('gano');
      this.contadorPuntos++;
      this.iniciarJuego();
    } else {
      this.gameOver();
    }
  }

  gameOver() {
    this.save = true;
    this.enJuego = false;
    this.juegoOff = !this.enJuego;
    this.toastr.error('Intentalo de nuevo', '¡Perdiste!');
  }

  finalizar() {
    this.contadorPuntos = 0;
    this.enJuego = false;
    this.juegoOff = !this.enJuego;
    this.toastr.error('Seguro?', ':(');
  }

  // guardar() {
  //   this.user.puntajes[0]['ahorcadoJugados'] += 1;
  //   console.info(this.user);
  //   console.info(this.user.puntajes[0]['preguntadosJugados']);
  //   this.dataService
  //     .savePuntaje('preguntados', this.user, this.contadorPuntos)
  //     .then(() => {
  //       this.toastr.success('Puntos guardados');
  //     })
  //     .catch((err) => {
  //       this.toastr.error('Al guardar: ' + err.message, 'Error');
  //     });
  //   this.save = false;
  // }
  guardar():void{
    let data:any = JSON.parse(localStorage.getItem('user'));
    this.scoreService.saveScore(data,this.contadorPuntos,"Preguntados").then(()=>{
      this.toastr.success('Puntos guardados');
    })
    this.save = false;
  }

  // getCurrentUser() {
  //   var uid = '0';
  //   this.authService
  //     .getUserUid()
  //     .then((res) => {
  //       uid = res.toString();
  //       this.dataService.getUserByUid(uid).subscribe((res) => {
  //         this.user = res;
  //       });
  //     })
  //     .catch((res) => {
  //       uid = res.toString();
  //       console.log('Sin Usuario');
  //     });
  // }
}
