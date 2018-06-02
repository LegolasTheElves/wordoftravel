import { Component, OnInit, Input, AfterViewChecked, ViewChildren } from '@angular/core';
import { SearchDetails } from './details';

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
      console.log(this.item);
    })
  }


  ngAfterViewChecked() {
    //console.log(this.item.Places);
  }

  selectedPlaces(item){
    let place = item;
   
    let location = place.replace(/\s/g,'-');
    this.places = location.toLowerCase(); 
    //window.location.href = "/wordoftravel/destinations/" + res + "-" + this.placeid;

    console.log(this.places);
  }
}
