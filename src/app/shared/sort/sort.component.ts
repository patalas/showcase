import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mp-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {

  @Input()
  sortDir = 'asc';

  constructor() { }

  ngOnInit(): void {
  }
}
