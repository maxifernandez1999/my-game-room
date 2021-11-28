import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {
  emailUser:string = "";

  constructor(private usersService:UsersService) {}
  users:any[] = [];
  ngOnInit(): void {

  }
  exists(){
    this.usersService.getUsers().subscribe(users => {
      users.forEach(user => {
        this.users.push(user);
      });
    });
    console.log(this.users);
  }

}
