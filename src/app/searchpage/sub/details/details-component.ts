import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { SearchDetails } from './details';
import swal from 'sweetalert';


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
    let location = this.places.replace(/\s/g,'-');
    let res = location.toLowerCase();
    let confimation = swal("Do you want to update your search to show results for "  + this.places +"?", {
      buttons: ["Oh noez!", "Aww yiss!"],
    }).then((willDelete) => {
      if (willDelete) {
        window.location.href = "/wordoftravel/destinations/" + res + "-" + this.placeid;
      } else {
        return;
      }
    });
		
  }

}
