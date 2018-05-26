import { Component, OnInit, Input } from '@angular/core';
import { SearchDetails } from './details';


@Component({
  selector: 'app-search-dest-details',
  templateUrl: './details-component.html'
})
export class SearchDetailsComponent implements OnInit {
  @Input() item: SearchDetails;

  constructor() { }

  ngOnInit() {
		console.log( 'init ===========================================================================================');
    console.log( this.item );
  }

}
