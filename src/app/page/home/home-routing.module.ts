import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { HangmanGameComponent } from './components/hangman-game/hangman-game.component';
import { MajorMinorComponent } from './components/major-minor/major-minor.component';
import { PreguntadosComponent } from './components/preguntados/preguntados.component';
import { TreasureComponent } from './components/treasure/treasure.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    children:[
      { path: '', component: HomeComponent },
      { path: 'hangman', component: HangmanGameComponent },
      { path: 'treasure', component: TreasureComponent },
      { path: 'majmin', component: MajorMinorComponent },
      { path: 'preguntados', component: PreguntadosComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'encuesta', component: EncuestaComponent },
      { path: '**', component: HomeComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
