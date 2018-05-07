import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-dest-details',
  templateUrl: './details-component.html'
})
export class SearchDetailsComponent implements OnInit {
  @Input() item: {};

  constructor() { }

  ngOnInit() {
		console.log( 'init ===========================================================================================');
		console.log( this.item );
  }

}
