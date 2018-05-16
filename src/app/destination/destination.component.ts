import { Component, OnInit } from '@angular/core';
import { Destination } from './destination';
import { DestinationService } from './destination.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  errorMessage: string;
  destinations: any;

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
         for(let obj in destinations){
           this.destinations.push(destinations[obj]);
         }
         console.log(JSON.stringify(this.destinations));
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

}
