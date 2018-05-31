import { Component, OnInit, Input, AfterViewChecked, ViewChildren } from '@angular/core';
import { SearchDetails } from './details';
import swal from 'sweetalert';

declare function loadmodal();

@Component({
  selector: 'app-search-dest-details',
  templateUrl: './details-component.html'
})
export class SearchDetailsComponent implements AfterViewChecked  {
  @Input() item: SearchDetails;
  places:any;
  placeid:any;
  @ViewChildren('owlitem') items: any;

  constructor() {}

  ngAfterViewInit() {
    this.items.changes.subscribe(t => {
      loadmodal();
    })
  }


  ngAfterViewChecked() {
    //console.log(this.item.Places);
  }
  selectedPlaces(item, id){
    this.places = item;
    this.placeid = id;
    let tagid = this.placeid;
    let location = this.places.replace(/\s/g,'-');
    let res = location.toLowerCase();
     //console.log(this.item.Places);
  }

}
