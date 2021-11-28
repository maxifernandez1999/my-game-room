import { AfterViewInit, Component, OnInit } from '@angular/core';
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
  constructor(private toastr: ToastrCustomService) {}

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
  }
  // generate a random Number
  public getRandomNumber(size: any) {
    return Math.floor(Math.random() * size);
  }
// click handler

  public game(e:any):void{
    console.log('click');
    this.clicks++;
    let distance = this.getDistance(e, this.target);
    let distanceHint = this.getDistanceHint(distance);
    this.$distance.innerHTML = `<h1>${distanceHint}</h1>`;
  
    if (distance < 20 ) {
      // alert(`Found the treasure in ${this.clicks} clicks!`);
      this.toastr.success(this.clicks).onHidden.subscribe(res => {
        window.location.reload();
      })
      
    }
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
      return 'Boiling hot!';
    } else if (distance < 40) {
      return 'Really Hot';
    } else if (distance < 60) {
      return 'Hot';
    } else if (distance < 100) {
      return 'Warm';
    } else if (distance < 180) {
      return 'Cold';
    } else if (distance < 360) {
      return 'Really Cold';
    } else {
      return 'Freezing!';
    }
  }
}
