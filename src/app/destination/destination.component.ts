import { Component, OnInit, ViewChildren, Input } from '@angular/core';
import { Destination } from './destination';
import { DestinationService } from './destination.service';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {
  @Input() item: Destination;

  constructor() { }

  ngOnInit() {
		console.log( 'init ===========================================================================================');
    console.log( this.item );
  }

}
