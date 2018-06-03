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
  exploredestinations: boolean;

  constructor(private travelDestinationService: TravelDestinationService) {
    this.destinations = [];
    
    if(window.location.pathname.includes('explore-destinations')){
      this.exploredestinations = true;
    } else {
      this.exploredestinations = false;
    }
   }

  ngOnInit() {
    this.getTravelDestination();
  }

  getTravelDestination(): void {
    this.travelDestinationService.getTravelDestination()
      .subscribe(
        destinations => {
          let featuredDestinations = destinations['rsltCol'];
          for(let destination of featuredDestinations){
            if(destination.Orientation == "L"){
              this.wideDestination = destination;
            } else if(destination.Orientation == "P"){
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
