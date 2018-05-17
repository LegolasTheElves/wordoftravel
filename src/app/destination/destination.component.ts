import { Component, OnInit, ViewChildren } from '@angular/core';
import { Destination } from './destination';
import { DestinationService } from './destination.service';
declare function owlRotator();

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  errorMessage: string;
  destinations: any;
  @ViewChildren('owlitem') items: any;

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

}
