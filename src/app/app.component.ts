import { LoadBaseData } from './model/actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-showcase';

  baseDataLoaded = false;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
   this.store.dispatch(new LoadBaseData()).subscribe(() => {
     this.baseDataLoaded = true;
   })
  }

}
