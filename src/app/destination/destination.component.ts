import { Component, OnInit, ViewChildren, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Destination } from './destination';
import { DestinationService } from './destination.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnChanges {
  destinations: any;
  errorMessage: any;
  @Input() item: Destination;
   tallDestination: any;
   wideDestination: any;
   regionName:any;

  constructor(
    private destinationApiService: DestinationService,
    private featuredDestinationService: DestinationService
  ) {
    this.destinations = [];
  }
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    this.getFeaturedDestination();
  }

  getFeaturedDestination(): void {
    if(this.item.RegionName == undefined) { return; }
    
    this.featuredDestinationService.getFeaturedDestination(this.item.RegionName.toLowerCase().replace(/[,\s]+|[,\s]+/g, '-'))
      .subscribe(
        destinations => {
          this.destinations = []; // empty array first
          this.tallDestination = []; // empty array first
          this.wideDestination = []; // empty array first
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
