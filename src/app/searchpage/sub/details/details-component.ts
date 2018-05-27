import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { SearchDetails } from './details';


@Component({
  selector: 'app-search-dest-details',
  templateUrl: './details-component.html'
})
export class SearchDetailsComponent implements AfterViewChecked  {
  @Input() item: SearchDetails;
  places:any;
  placeid:any;

  constructor() {}

  ngAfterViewChecked() {
    //console.log(this.item.Places);
  }
  selectedPlaces(item, id){
    this.places = item;
    this.placeid = id;
    console.log(this.places, this.placeid);
    let location = this.places.replace(/\s/g,'-');
    var res = location.toLowerCase();
    let confimation = window.confirm("Do you want to update your search to show results for "  + this.places +"?");
    if(confimation == true){
      window.location.href = "/wordoftravel/destination/" + res + "-" + this.placeid;
    }else{
      return;
    }
		
  }

}
