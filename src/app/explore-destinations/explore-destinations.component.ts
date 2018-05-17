import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinationService } from '../destination/destination.service';

@Component({
  selector: 'app-explore-destinations',
  templateUrl: './explore-destinations.component.html',
  styleUrls: ['./explore-destinations.component.css']
})
export class ExploreDestinationsComponent implements OnInit {
  errorMessage: string;
  destinations: any;
  defaulRegion: any;
  region: string;
  countries: any;

  constructor(
    public route: ActivatedRoute,
    private destinationApiService: DestinationService) {
    this.route.params.subscribe(params => {
      this.region = params.region;
    });
    this.destinations = [];
   }

  ngOnInit() {
    //console.log("Region: ." + this.region + ".");
    this.getRegion();
  }
  getRegion(): void {
    this.destinationApiService.getDestination()
      .subscribe(
        destinations => {
         for(let obj in destinations){
           console.log(obj[0]);
           if(obj == this.region) {
             this.countries = destinations[obj].Countries;
           }
          }
         console.log(JSON.stringify(this.countries));
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

}
