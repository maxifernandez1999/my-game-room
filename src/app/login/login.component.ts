import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('asContainer') container:any;

  constructor(private renderer2:Renderer2) { }

  ngOnInit(): void {
  }
  
  signUp(){
    const elementContainer = this.container.nativeElement;
    this.renderer2.addClass(elementContainer,"right-panel-active");
    // this.container.classList.add("right-panel-active");
  }
  signIn(){
    const elementContainer = this.container.nativeElement;
    this.renderer2.removeClass(elementContainer,"right-panel-active");
    // this.container.classList.remove("right-panel-active");
  }

}
