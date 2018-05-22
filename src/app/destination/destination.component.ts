import { Component, OnInit, ViewChildren, Input } from '@angular/core';
import { Destination } from './destination';
import { DestinationService } from './destination.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  errorMessage: any;
  destinations: Destination[];
  @Input() item: Destination;
  africa:Destination;
  selectedItem:{};

  constructor(private destinationApiService: DestinationService) {
    this.destinations = [];
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
          this.africa = this.destinations[0]
          console.log(this.africa);
        },
        error => {
          this.errorMessage = <any>error;
        });
  }
  selected(){
    this.selectedItem = this.item;
  }
}
