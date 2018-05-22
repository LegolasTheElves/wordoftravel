import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DestinationService } from '../destination/destination.service';

@Component({
  selector: 'app-specific-destination',
  templateUrl: './specific-destination.component.html',
  styleUrls: ['./specific-destination.component.css']
})
export class SpecificDestinationComponent implements OnInit {
  @Input() item: {};
  errorMessage: string;
  destinations: any;
  region: string;
  countries: any;
  removeCountries:any;

  constructor(
    public route: ActivatedRoute,
    private destinationApiService: DestinationService) {
    this.route.params.subscribe(params => {
      this.region = params.region;
    });
    this.destinations = [];
    this.countries = [];
  }

  ngOnInit() {
    console.log("Region: ." + this.region + ".");
    this.getRegion();
  }
  getRegion(): void {
    this.destinationApiService.getDestination()
      .subscribe(
        destinations => {
          for (let obj in destinations) {
            if (obj == this.region) {
              let listOfCountries = destinations[obj].Countries;
              for(let country of listOfCountries) {
                if (country.Show == false) {
                  this.removeCountries = country;
                } else {
                  this.countries.push(country);
                }
              }
            }
          }
         //console.log(JSON.stringify(this.countries));
        },
  error => {
  this.errorMessage = <any>error;
});
  }
}
