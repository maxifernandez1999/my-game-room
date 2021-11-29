import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {
  emailUser:string = "";
  nameUser:string = "";

  constructor() {}
  ngOnInit(): void {
    this.getLocalStorageData();
  }
  getLocalStorageData():void{
    this.nameUser = JSON.parse(localStorage.getItem('user')).name;
    this.emailUser = JSON.parse(localStorage.getItem('user')).email;
  }

}
