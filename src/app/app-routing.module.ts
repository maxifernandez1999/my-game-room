import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './page/home/home.module';
import { LoginComponent } from './page/login/login.component';
import { QuienSoyComponent } from './page/quien-soy/quien-soy.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'quien-soy',
    component: QuienSoyComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
