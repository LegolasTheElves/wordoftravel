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
  removeCountries: any;
  errorMessage: string;
  destinations: any;
  countries: any;
  africa:any;
  countriesOfAfrica: any;
  @ViewChildren('owlitem') items: any;

  selectedRegion = {};

  constructor(private destinationApiService: DestinationService) {
    this.destinations = [];
    this.countriesOfAfrica = [];
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
          this.africa = this.destinations[0];
          let countyOfAfrica = this.africa.Countries;
          for(let country of countyOfAfrica) {
            if (country.Show == false) {
              this.removeCountries = country;
            } else {
              this.countriesOfAfrica.push(country);
              //console.log(JSON.stringify(this.countriesOfAfrica));
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
}
