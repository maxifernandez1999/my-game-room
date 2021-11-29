import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './components/chat/chat.component';
import { ErrorComponent } from './components/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { HangmanGameComponent } from './components/hangman-game/hangman-game.component';
import { InfoUserComponent } from './components/info-user/info-user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MajorMinorComponent } from './components/major-minor/major-minor.component';
import { TreasureComponent } from './components/treasure/treasure.component';
import { PreguntadosComponent } from './components/preguntados/preguntados.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';



@NgModule({
  declarations: [
    HomeComponent,
    ChatComponent,
    ErrorComponent,
    FooterComponent,
    HangmanGameComponent,
    InfoUserComponent,
    NavbarComponent,
    MajorMinorComponent,
    TreasureComponent,
    PreguntadosComponent,
    EncuestaComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ], 
  exports: [
    NavbarComponent
  ]
})
export class HomeModule { }
