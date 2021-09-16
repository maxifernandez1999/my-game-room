import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  component:any = "<app-hangman-game></app-hangman-game>";
  @ViewChild('games') game:any = "";
  constructor(private renderer2:Renderer2) { }

  ngOnInit(): void {
    let games:any = this.game.ElementRef;
    let element:any = this.renderer2.createElement("app-hangman-game");
    // this.renderer2.appendChild(games,element);
    this.component = element;
  }

}
