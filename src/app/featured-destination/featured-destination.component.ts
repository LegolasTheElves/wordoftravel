import { Component, OnInit } from '@angular/core';
import { TravelDestination } from '../featured-destination/travelDestination';
import { TravelDestinationService } from '../featured-destination/travelDestination.service';

@Component({
  selector: 'app-featured-destination',
  templateUrl: './featured-destination.component.html',
  styleUrls: ['./featured-destination.component.css']
})
export class FeaturedDestinationComponent implements OnInit {
  errorMessage: string;
  destinations: TravelDestination[];
  tallDestination: TravelDestination;
  wideDestination: TravelDestination;

  constructor(private travelDestinationService: TravelDestinationService) {
    this.destinations = [];
   }

  ngOnInit() {
    this.getTravelDestination();
  }

  getTravelDestination(): void {
    this.travelDestinationService.getTravelDestination()
      .subscribe(
        destinations => {
          let featuredDestinations = destinations.rsltCol;
          for(let destination of featuredDestinations){
            //console.log(JSON.stringify(destination));
            if(destination.Orientation == "L"){
              console.log('found wide');
              this.wideDestination = destination;
            } else if(destination.Orientation == "P"){
              console.log('found tall');
              this.tallDestination = destination;
            } else {
              this.destinations.push(destination);
            }
          }
        },
        error => this.errorMessage = <any>error,
      );
  }


}
