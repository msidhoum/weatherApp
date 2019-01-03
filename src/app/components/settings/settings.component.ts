import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { GridsterConfig } from 'angular-gridster2';
import { WidgetModel } from 'src/app/models/widget.model';
import { DashboardModel } from 'src/app/models/dashboard.model';
import { StoreService } from 'src/app/services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None // disable css encapsulation to override sub components styles
})
export class SettingsComponent implements OnInit, OnDestroy {
  /**
   * the dashboard model for grid
   */
  dashboard: DashboardModel;
  /**
   * gridster configuration for settings page
   */
  options: GridsterConfig;
  /**
   * List of store applications widgets
   */
  widgetsRegistry: Array<any>;
  /**
   * rxjs subscription to install widgets
   */
  installWidgetSubscription: Subscription;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.options = <GridsterConfig>{
      displayGrid: 'always',
      gridType: 'fit',
      minCols: 8,
      minRows: 6,
      margin: 0,
      pushItems: false,
      swap: false,
      resizable: {
        enabled: true
      },
      draggable: {
        enabled: true,
        dragHandleClass: 'widget-handler',
        ignoreContent: true,
        ignoreContentClass: 'widget-container'
      }
    };

    this.dashboard = this.storeService.getUserDashboard();
    this.storeService.loadData().subscribe((data: any) => {
      this.widgetsRegistry = data.widgetsRegistry;
    });
    this.installWidgetSubscription = this.storeService.installWidget.subscribe((widget: any) => {
      this.addGridItem(widget);
    });
  }

  // proceed to remove item from the grid
  removeItem(item: WidgetModel) {
    this.dashboard.items.splice(this.dashboard.items.indexOf(item), 1);
  }

  addGridItem(widget: any) {
    const item = {
      gridItem: Object.assign({}, { x: 0, y: 0, cols: widget.colSize, rows: widget.rowSize }, widget),
      widgetRefId: widget.id
    };
    this.dashboard.items.push(item);
  }

  installWidget(widget: any) {
    this.storeService.installWidget.next(widget);
  }

  ngOnDestroy() {
    this.installWidgetSubscription.unsubscribe();
  }

}


