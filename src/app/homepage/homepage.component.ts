import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../destination/destination.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

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
         //console.log(JSON.stringify(this.destinations));
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

}
