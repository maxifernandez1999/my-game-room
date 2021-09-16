import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HangmanGameComponent } from './components/hangman-game/hangman-game.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    children:[
      { path: 'hangman', component: HangmanGameComponent },
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
