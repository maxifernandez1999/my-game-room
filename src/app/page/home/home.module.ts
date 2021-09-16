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
import { FormsModule } from '@angular/forms';
import { AppModule } from 'src/app/app.module';



@NgModule({
  declarations: [
    HomeComponent,
    ChatComponent,
    ErrorComponent,
    FooterComponent,
    HangmanGameComponent,
    InfoUserComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ]
})
export class HomeModule { }
