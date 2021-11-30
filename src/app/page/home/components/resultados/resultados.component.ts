import { Component, OnInit } from '@angular/core';
import { Score } from 'src/app/models/score';
import { ScoreService } from 'src/app/services/score/score.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss']
})
export class ResultadosComponent implements OnInit {
  scores:Score[] = [];
  constructor(private scoreService:ScoreService) { }

  ngOnInit(): void {
    this.getScores();
  }
  getScores():void{
    this.scoreService.getScores().subscribe(response => {
      this.scores = response;
    })
  }

}
