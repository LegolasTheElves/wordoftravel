import { Component, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinationService } from '../destination/destination.service';
declare function owlRotator();

@Component({
  selector: 'app-explore-destinations',
  templateUrl: './explore-destinations.component.html',
  styleUrls: ['./explore-destinations.component.css']
})
export class ExploreDestinationsComponent implements OnInit {
  errorMessage: string;
  destinations: any;
  countries: any;
  @ViewChildren('owlitem') items: any;

  selectedRegion = {};

  constructor(private destinationApiService: DestinationService) {
    this.destinations = [];
  }
  ngAfterViewInit() {
    this.items.changes.subscribe(t => {
      owlRotator();
    })
  }
  ngOnInit() {
    this.getDestinations();
  }
  getDestinations(): void {
    this.destinationApiService.getDestination()
      .subscribe(
        destinations => {
          for (let obj in destinations) {
            this.destinations.push(destinations[obj]);
            this.countries = destinations[obj].Countries;
          }
          console.log(JSON.stringify(this.destinations[0].RegionName));
        },
        error => {
          this.errorMessage = <any>error;
        });
  }
  selectRegion(item) {
    this.selectedRegion = item;
  }
}
