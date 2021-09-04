import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('asContainer') container:any;

  constructor(private renderer2:Renderer2,private rutas:Router) { }

  ngOnInit(): void {
  }
  
  signUp(){
    // this.rutas.navigate(['home']);
    const elementContainer = this.container.nativeElement;
    this.renderer2.addClass(elementContainer,"right-panel-active");
    // this.container.classList.add("right-panel-active");
  }
  signIn(){
    
    const elementContainer = this.container.nativeElement;
    this.renderer2.removeClass(elementContainer,"right-panel-active");
  }

}
