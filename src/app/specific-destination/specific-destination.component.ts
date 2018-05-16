import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-specific-destination',
  templateUrl: './specific-destination.component.html',
  styleUrls: ['./specific-destination.component.css']
})
export class SpecificDestinationComponent implements OnInit {
  @Input() item: {};
  constructor() { }

  ngOnInit() {
  }

}
