import { Component, OnInit, ViewChildren } from '@angular/core';
import { DestinationService } from '../destination/destination.service';
declare function owlRotator();
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  errorMessage: string;
  destinations: any;
  @ViewChildren('owlitem') items: any;
  selectedRegion:any;

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
          }
          //console.log(JSON.stringify(this.destinations));
        },
        error => {
          this.errorMessage = <any>error;
        });
  }
  selectedPlaces(item) {
    this.selectedRegion = item;
    let location = this.selectedRegion.replace(/\s/g, '-');
    let res = location.toLowerCase();
    window.location.href = "/wordoftravel/explore-destinations/" + res;
  }
}

