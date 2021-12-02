import { Component, OnInit } from '@angular/core';
import { Encuesta } from 'src/app/models/encuesta';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-result-encuesta',
  templateUrl: './result-encuesta.component.html',
  styleUrls: ['./result-encuesta.component.scss']
})
export class ResultEncuestaComponent implements OnInit {
  encuestas:Encuesta[] = [];
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.getScores();
  }
  getScores():void{
    this.dataService.getEncuestas().subscribe(response => {
      this.encuestas = response;
    })
  }

}
