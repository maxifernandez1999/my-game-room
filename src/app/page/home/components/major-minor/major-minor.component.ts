import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data/data.service';
import { ScoreService } from 'src/app/services/score/score.service';

@Component({
  selector: 'app-major-minor',
  templateUrl: './major-minor.component.html',
  styleUrls: ['./major-minor.component.scss']
})
export class MajorMinorComponent implements OnInit {

  enJuego:boolean=false;
  save:boolean=false;
  contadorPuntos:number=0;
  carta:any;
  juegoOff:boolean=false;
  user: any;
  cartaAnterior:any;
  cartas:any;

  constructor(private toastr: ToastrService/* , private authService: AuthService */,
    private dataService: DataService,private fire:AngularFireAuth, private http: HttpClient, private scoreService:ScoreService) { }

  ngOnInit(): void {
    // this.getCurrentUser();
    this.ObtenerCartas();
  }

  ObtenerCartas(){
    this.cartas= new Array();
    this.http.get('https://deckofcardsapi.com/api/deck/new/draw/?count=52').subscribe((response) => {
      this.cartas = response['cards'];
      this.carta=this.cartas.pop();
    });
  }
  
  predecirCarta(prediccion:string){
    console.log('eleccion',prediccion)
    this.cartaAnterior=this.carta;
    this.carta = this.cartas.pop();
    var res = this.compararCartas(this.cartaAnterior,this.carta);
    console.log('res',res);

    switch(prediccion){
      case 'mayor':
        if(res==1){
          this.contadorPuntos++;
          this.toastr.success("Continúa así", "Perfecto!");
        }
        else{
          this.gameOver();
        }
      break;
      case 'menor':
        if(res==-1){
          this.contadorPuntos++;
          this.toastr.success("Continúa así", "Perfecto!");
        }
        else{
          this.gameOver();
        }
      break;
      case 'igual':
      
        if(res==0){
          this.contadorPuntos++;
          this.toastr.success("Continúa así", "Perfecto!");
        }else{
          this.gameOver();
        }
      break;
    }
  }

  compararCartas(cartaUno:any, cartaDos:any){
    let diferencia:number;
    let valorCartaUno:number=this.asignandoValorACarta(cartaUno.value);
    let valorCartaDos:number=this.asignandoValorACarta(cartaDos.value);;
    diferencia=valorCartaUno-valorCartaDos;
    if(diferencia>0){
      return 1;
    }
    else if(diferencia<0){
      return -1;
    }
    return 0;
  }

  

  nuevo() {
    this.enJuego = true;
    this.contadorPuntos=0;
    this.save = false;
    this.ObtenerCartas();
  }

  gameOver(){
    this.save = true;   
    this.enJuego = false;
    this.juegoOff = !this.enJuego;
    this.ObtenerCartas();
    this.toastr.error("Alpiste..", "¡Perdiste!");
  }
  
  finalizar(){
    this.save = true;   
    this.contadorPuntos=0;
    this.enJuego = false;
    this.juegoOff = !this.enJuego;
    this.toastr.error("¿¿Tan rápido te rendís??", "Me decepcionás");
  }

  // guardar(){
  //   this.user.puntajes[1]['mayorMenosJugados'] += 1;
    
  //   console.info(this.user);
  //   console.info(this.user.puntajes[1]['mayorMenosJugados']);
  //   this.dataService.savePuntaje('mayormenor', this.user, this.contadorPuntos)
  //     .then(() => {
  //       this.toastr.success("Puntos guardados")
  //     })
  //     .catch(err => {
  //       this.toastr.error("Al guardar: " + err.message, "Error");
  //     })
  //     this.save=false;
  // }
  guardar():void{
    let data:any = JSON.parse(localStorage.getItem('user'));
    this.scoreService.saveScore(data,this.contadorPuntos,"MayorMenor").then(()=>{
      this.toastr.success('Puntos guardados');
    })
    this.save = false;
  }

  // getCurrentUser() {
  //   var uid="0";
  //    this.authService.getUserUid().then(res =>{
  //      uid = res.toString();
  //      this.dataService.getUserByUid(uid)
  //         .subscribe(res => {
  //           this.user = res;
  //         })
  //    }).catch(res =>{
  //     uid = res.toString();
  //     console.log("Sin Usuario");
  //    });
  // }

  asignandoValorACarta(valor:string){
    let valorNumerico:number;
    switch(valor){
      case 'ACE':
        valorNumerico=1;
        break;
      case '2':
        valorNumerico=2;
        break;
      case '3':
        valorNumerico=3;
        break;
      case '4':
        valorNumerico=4;
        break;
      case '5':
        valorNumerico=5;
        break;
      case '6':
        valorNumerico=6;
        break;
      case '7':
        valorNumerico=7;
        break;
      case '8':
        valorNumerico=8;
        break;
      case '9':
        valorNumerico=9;
        break;
      case '10':
        valorNumerico=10;
        break;
      case 'JACK':
        valorNumerico=11;
        break;
      case 'QUEEN':
        valorNumerico=12;
        break;
      case 'KING':
          valorNumerico=13;
          break;
    }
    return valorNumerico;
  }

}
