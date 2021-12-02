import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ScoreService } from 'src/app/services/score/score.service';
@Component({
  selector: 'app-hangman-game',
  templateUrl: './hangman-game.component.html',
  styleUrls: ['./hangman-game.component.scss']
})
export class HangmanGameComponent implements OnInit {
  int:number = 0;
  win:number = 0;
  maxwin:number = 0;
  score:number;
  word:string = "";
  sizeWord:string = "_ _ _ _ _ _ _";
  arrayWord:string[] = [];
  letters:string[] = ["A","B","C","D","E","F","G","H","I","J","K","L","Ñ",
                      "N","M","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

  @ViewChild('asHangman') hangman:any = "";
  @ViewChild('buttonSave') buttonSave:ElementRef;
  @ViewChild('p') p:any = "";
  constructor(private renderer2:Renderer2, private toastr: ToastrService, private scoreService:ScoreService) { 
  }
  ngOnInit(): void {
    
    
  }
  ngAfterViewInit():void{
    let el = this.buttonSave.nativeElement;
    this.renderer2.addClass(el,"disabled");
  }
  init(){
    this.arrayWord = [
      "MONTA",
      "CALMO",
      "ABETO",
      "ACERO",
      "ACIJE",
      "ACOTE"

    ]
    this.generateWord();
  }
  public reset():void{
    window.location.reload();
  }
  getLetterPressIndex(letter:string){
    return this.word.indexOf(letter);
  }
  letterPress(obj:any,letter:string){
    console.log(letter)
    let buttonLetterElement: any = obj.srcElement;
    
    if (this.getLetterPressIndex(letter) != -1) {
      this.renderer2.addClass(buttonLetterElement,"disabled");
      this.setLetters(letter);
        this.win++;
        console.log(this.win);
      
    }else{
      this.renderer2.addClass(buttonLetterElement,"btn-danger");
      this.renderer2.addClass(buttonLetterElement,"disabled");
    }
    this.int++;
    if(this.int >= 10){
      this.toastr.error('Perdiste!', 'Solo tiene 10 intentos');
      setTimeout(()=>{
        window.location.reload();
      },1000);
      
    }
    this.score = this.int;
    const el = this.p.nativeElement;
    this.renderer2.setProperty(el,'innerHTML',"Intentos: " + this.int.toString())
    if (this.win === this.maxwin) {
      this.score = this.int;
      let el = this.buttonSave.nativeElement;
      this.renderer2.removeClass(el,"disabled");
      this.toastr.success('Ganaste!', 'Felicidades!');  
    }
  }
  generateWord(){
    
    this.word = this.arrayWord[this.randomWord(1,5)];
    console.log(this.word);
    var elementWord = this.hangman.nativeElement;
    switch (this.word.length) {
      case 5:
        
        console.log(elementWord)
        console.log(this.CreateWord(5))
        this.renderer2.setProperty(elementWord,"innerHTML",this.CreateWord(5));
        this.maxwin = 5;
        break;
      case 4:
        console.log(elementWord)
        console.log(this.CreateWord(5))
        this.renderer2.setProperty(elementWord,"innerHTML",this.CreateWord(4));
        this.maxwin = 5;
        break;
      default:
        console.log("default")
        break;
    }
  }
  public save():void{
    let data:any = JSON.parse(localStorage.getItem('user'));
    console.log(data.email);
    console.log(data.name);
    console.log(this.score);
    this.scoreService.saveScore(data,this.score,"Ahorcado").then(()=>{
      this.toastr.success('Se ha guardado la partida', 'Save!');
    })
  }

  CreateWord(size:number):string{
    let word:string = "";
    for (let index = 0; index < size; index++) {
      word += `<button id=${index} class="btn btn-success m-1 btn-lg" >?</button>`;
      
    }
    return word;
    
    
  }


  setLetters(letterParam:string){
    
    let index = this.getLetterPressIndex(letterParam);
    let element = document.getElementById(index.toString());
    element != null ? element.innerHTML = letterParam : "no encontrado";
    
  }
  
  randomWord(min:number,max:number){
    console.log(Math.round(Math.random() * (max - min) + min))
    return Math.round(Math.random() * (max - min) + min);
  }





}
