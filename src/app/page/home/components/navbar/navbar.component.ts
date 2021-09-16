import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(private rutas:Router,private auth:UsersService) { }

  ngOnInit(): void {

  }
  logOut(){
    this.auth.logOut().then(log => {
      this.rutas.navigate(['login']);
    });
    
  }

}
