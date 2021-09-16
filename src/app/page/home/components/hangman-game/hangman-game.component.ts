import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { textChangeRangeIsUnchanged } from 'typescript';

@Component({
  selector: 'app-hangman-game',
  templateUrl: './hangman-game.component.html',
  styleUrls: ['./hangman-game.component.scss']
})
export class HangmanGameComponent implements OnInit {
  word:string = "";
  sizeWord:string = "_ _ _ _ _ _ _";
  arrayWord:string[] = [];
  letters:string[] = ["A","B","C","D","E","F","G","H","I","J","K","L","Ñ",
                      "N","M","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  constructor(private renderer2:Renderer2) { 
    
  }
  ngOnInit(): void {
    this.arrayWord = [
      "PERRO",
      "GATO",
      "MONO",
      "CALL",
      "HOLA"
    ]
    this.generateWord();
  }
  getLetterPressIndex(letter:string){
    return this.word.indexOf(letter);
  }
  letterPress(obj:any,letter:string){
    let buttonLetterElement: any = obj.srcElement;
    
    if (this.getLetterPressIndex(letter) != -1) {
      this.renderer2.addClass(buttonLetterElement,"disabled");
      this.setLetters(letter);
    }else{
      this.renderer2.addClass(buttonLetterElement,"btn-danger");
      this.renderer2.addClass(buttonLetterElement,"disabled");
    }
  }
  generateWord(){
    
    this.word = this.arrayWord[this.randomWord(1,4)];
    console.log(this.word);
    switch (this.word.length) {
      case 5:
        this.sizeWord = "_ _ _ _ _";
        break;
      case 4:
        this.sizeWord = "_ _ _ _";
        break;
      default:
        break;
    }
  }


  setLetters(letterParam:string){
    let arrayLetters = this.word.split("");
    let newArray = arrayLetters.map((letter,index) =>{
      if (index == this.getLetterPressIndex(letterParam)) {
        return letter;
      }
      return "_";
    });
    this.sizeWord = newArray.join("");
    console.log(this.sizeWord);
    
  }
  
  randomWord(min:number,max:number){
    return Math.floor(Math.random() * (max - min) + min);
  }





}
