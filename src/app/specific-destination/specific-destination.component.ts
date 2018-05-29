import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DestinationService } from '../destination/destination.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-specific-destination',
  templateUrl: './specific-destination.component.html',
  styleUrls: ['./specific-destination.component.css']
})
export class SpecificDestinationComponent implements OnInit {
  regionTitle: string;
  @Input() item: {};
  errorMessage: string;
  destinations: any;
  region: string;
  countries: any;
  removeCountries: any;

  constructor(
    public route: ActivatedRoute,
    private destinationApiService: DestinationService,
    private meta: Meta,
    private title: Title
  ) {
    this.route.params.subscribe(params => {
      this.region = params.region;
      this.regionTitle = this.region.split(/[0-9\-_]+/).join(' ');
    });
    this.destinations = [];
    this.countries = [];
    let placeName = this.region;
    let res = placeName.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    this.title.setTitle("Travel Blogs, Itineraries and Destination Tips about " + res + " | wordoftravel");
    this.meta.addTag({
      name: 'description',
      content: "Planning a trip to " + res + " ? Discover great destination ideas and read real travel stories from other independent travellers and travel bloggers. Explore new areas of " + res + " that take you off the tourist trail."
    });
  }

  ngOnInit() {
    console.log("Region: " + this.region + ".");
    this.getRegion();
  }
  getRegion(): void {
    this.destinationApiService.getDestination()
      .subscribe(
        destinations => {
          for (let obj in destinations) {
            let location = obj.replace(/[,\s]+|[,\s]+/g, '-');
            let res = location.toLowerCase();
            if (res == this.region) {
              let listOfCountries = destinations[obj].Countries;
              for (let country of listOfCountries) {
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
