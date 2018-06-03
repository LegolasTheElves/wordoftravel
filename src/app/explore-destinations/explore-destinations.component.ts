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
  tallDestination: any;
  wideDestination: any;
  removeCountries: any;
  errorMessage: string;
  destinations: any;
  countries: any;
  africa:any;
  countriesOfAfrica: any;
  africaFeatured:any;
  exploredestinations: boolean;
  @ViewChildren('owlitem') items: any;

  selectedRegion = {};

  constructor(
    private destinationApiService: DestinationService,
    private featuredDestinationService: DestinationService
  ) {
    this.destinations = [];
    this.countriesOfAfrica = [];
    this.africa = [];
    this.africaFeatured = [];
    
    if(window.location.pathname.includes('explore-destinations')){
      this.exploredestinations = true;
    } else {
      this.exploredestinations = false;
    }
  }
  
  ngAfterViewInit() {
    this.items.changes.subscribe(t => {
      owlRotator();
    })
  }

  ngOnInit() {
    this.getDestinations();
    this.getFeaturedDestination();    
  }
  
  getDestinations(): void {
    this.destinationApiService.getDestination()
      .subscribe(
        destinations => {
          for (let obj in destinations) {
            if(destinations[obj].RegionName == "Africa"){
              this.africa = destinations[obj];
            }else{
              this.destinations.push(destinations[obj]);
            }
          }

          let countyOfAfrica = this.africa.Countries;
          for(let country of countyOfAfrica) {
            if (country.Show != false) {
              this.countriesOfAfrica.push(country);
            }
          }
        },
        error => {
          this.errorMessage = <any>error;
        });
  }
  
  selectRegion(item) {
    this.selectedRegion = item;
  }
//get africa featured
  getFeaturedDestination(): void {
    this.featuredDestinationService.getAfricaFeatured()
      .subscribe(
        africaFeatured => {
          let featuredDestinations = africaFeatured['rsltCol'];
          for(let destination of featuredDestinations){
            if(destination.Orientation == "L"){
              this.wideDestination = destination;
            } else if(destination.Orientation == "P"){
              this.tallDestination = destination;
            } else {
              this.africaFeatured.push(destination);
            }
          }
        },
        error => this.errorMessage = <any>error,
      );
  }
}