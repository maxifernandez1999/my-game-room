import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ScoreService } from 'src/app/services/score/score.service';
import { ToastrCustomService } from 'src/app/services/toastr/toastrCustom.service';

@Component({
  selector: 'app-treasure',
  templateUrl: './treasure.component.html',
  styleUrls: ['./treasure.component.scss'],
})
export class TreasureComponent implements OnInit, AfterViewInit {
  // treasure coordinates
  WIDTH:number = 400;
  HEIGH:number = 400;
  $map:any;
  $distance:any;
  clicks:any;
  target:any;
  @ViewChild('buttonSave') buttonSave:ElementRef;
  @ViewChild('buttonNew') buttonNew:ElementRef;
  constructor(private toastr: ToastrCustomService, private toa: ToastrService, private scoreService:ScoreService, private renderer2:Renderer2) {}

  ngOnInit(): void {
    this.target = {
      x: this.getRandomNumber(this.WIDTH),
      y: this.getRandomNumber(this.HEIGH)
    };
    
  }
  ngAfterViewInit():void{
    this.$map = document.querySelector('#map');
    this.$distance = document.querySelector('#distance');
    this.clicks = 0;
      let el = this.buttonSave.nativeElement;
      this.renderer2.addClass(el,"disabled");
      let ele = this.buttonNew.nativeElement;
      this.renderer2.addClass(ele,"disabled");
  }
  // generate a random Number
  public getRandomNumber(size: any) {
    return Math.floor(Math.random() * size);
  }
// click handler
  public save():void{
    let data:any = JSON.parse(localStorage.getItem('user'));
    this.scoreService.saveScore(data,this.clicks,"Treasure").then(()=>{
      this.toa.success('Se ha guardado la partida', 'Save!');
      window.location.reload();
    })
  }
  public game(e:any):void{
    console.log('click');
    this.clicks++;
    let distance = this.getDistance(e, this.target);
    let distanceHint = this.getDistanceHint(distance);
    this.$distance.innerHTML = `<h1>${distanceHint}</h1>`;
  
    if (distance < 20 ) {
      // alert(`Found the treasure in ${this.clicks} clicks!`);
      let el = this.buttonSave.nativeElement;
      this.renderer2.removeClass(el,"disabled");
      let ele = this.buttonNew.nativeElement;
      this.renderer2.removeClass(ele,"disabled");
      this.toastr.success(this.clicks).onHidden.subscribe(res => {
        
      })
      
    }
  }
  public newGame():void{
    window.location.reload();
  }
  // get the Distance of two points
  public getDistance(e: any, target: any) {
    let diffX = e.offsetX - target.x;
    let diffY = e.offsetY - target.y;
    return Math.sqrt(diffX * diffX + diffY * diffY);
  }

  // return an String depending on the distances
  public getDistanceHint(distance: any) {
    if (distance < 30) {
      return 'Super Caliente!';
    } else if (distance < 40) {
      return 'Muy Caliente';
    } else if (distance < 60) {
      return 'Caliente';
    } else if (distance < 100) {
      return 'Tibio';
    } else if (distance < 180) {
      return 'Frio';
    } else if (distance < 360) {
      return 'Muy Frio';
    } else {
      return 'Congelado!';
    }
  }
}
