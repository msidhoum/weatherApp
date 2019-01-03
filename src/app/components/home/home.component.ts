import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { StoreService } from 'src/app/services/store.service';
import { DashboardModel } from 'src/app/models/dashboard.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  dashboard: DashboardModel;
  options: GridsterConfig;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.options = <GridsterConfig>{
      displayGrid: 'none',
      gridType: 'fit',
      minCols: 8,
      minRows: 6,
      margin: 0,
      pushItems: false,
      swap: false,
      resizable: {
        enabled: false
      },
      draggable: {
        enabled: false,
        dragHandleClass: 'widget-handler',
        ignoreContent: true,
        ignoreContentClass: 'widget-container'
      }
    };

    this.dashboard = this.storeService.getUserDashboard();
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

}
