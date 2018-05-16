import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-specific-destination',
  templateUrl: './specific-destination.component.html',
  styleUrls: ['./specific-destination.component.css']
})
export class SpecificDestinationComponent implements OnInit {
  @Input() item: {};
 
  region: string;

  constructor(public route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.region = params.region;
    });
   }

  ngOnInit() {
    console.log("Region: " + this.region);
  }

}
