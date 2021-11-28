import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-hangman-game',
  templateUrl: './hangman-game.component.html',
  styleUrls: ['./hangman-game.component.scss']
})
export class HangmanGameComponent implements OnInit {
  int:number = 0;
  win:number = 0;
  maxwin:number = 0;
  word:string = "";
  sizeWord:string = "_ _ _ _ _ _ _";
  arrayWord:string[] = [];
  letters:string[] = ["A","B","C","D","E","F","G","H","I","J","K","L","Ñ",
                      "N","M","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

  @ViewChild('asHangman') hangman:any = "";
  @ViewChild('p') p:any = "";
  constructor(private renderer2:Renderer2, private toastr: ToastrService) { 
  }
  ngOnInit(): void {
    
    
  }
  init(){
    this.arrayWord = [
      "PERO",
      "GATO",
      "MONTA",
      "CALMO",
      "HOLA"
    ]
    this.generateWord();
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
    }else{
      this.renderer2.addClass(buttonLetterElement,"btn-danger");
      this.renderer2.addClass(buttonLetterElement,"disabled");
    }
    this.int++;
    const el = this.p.nativeElement;
    this.renderer2.setProperty(el,'innerHTML',"Intentos: " + this.int.toString())
    if (this.win === this.maxwin) {
      // alert("Ha ganado en " + this.int + "intentos");
      this.toastr.success('Hello world!', 'Toastr fun!');   
      window.location.reload();   
    }
  }
  generateWord(){
    
    this.word = this.arrayWord[this.randomWord(1,4)];
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
    return Math.floor(Math.random() * (max - min) + min);
  }





}
