import { Component, OnInit, ViewChildren } from '@angular/core';
import { DestinationService } from '../destination/destination.service';
import { CookieService } from 'ngx-cookie-service';
declare function owlRotator();
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  cookieValue = 'UNKNOWN';
  errorMessage: string;
  destinations: any;
  @ViewChildren('owlitem') items: any;
  selectedRegion:any;
  exploredestinations: boolean;

  constructor(
    private destinationApiService: DestinationService,
    private cookieService: CookieService
  ) {
    this.destinations = [];

    if(window.location.pathname.includes('explore-destinations')){
      this.exploredestinations = true;
    } else {
      this.exploredestinations = false;
    }
  }
  ngAfterViewInit() {
    this.items.changes.subscribe(t => {
      owlRotator();
    });
  }
  ngOnInit() {
    this.cookieService.set( 'Cookie Warning', 'This web application uses cookies to store private data.' );
    console.log(this.cookieValue = this.cookieService.get('Cookie Warning'));
    this.getDestinations();
  }
  
  getDestinations(): void {
    this.destinationApiService.getDestination()
      .subscribe(
        destinations => {
          for (let obj in destinations) {
            this.destinations.push(destinations[obj]);
          }
          //console.log(JSON.stringify(this.destinations));
        },
        error => {
          this.errorMessage = <any>error;
        });
  }
  selectedPlaces(item) {
    this.selectedRegion = item;
    let location = this.selectedRegion.replace(/[,\s]+|[,\s]+/g, '-');
    let res = location.toLowerCase();
    window.location.href = "/wordoftravel/explore-destinations/" + res;
  }
}

