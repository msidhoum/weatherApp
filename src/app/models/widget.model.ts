import { GridsterItem } from 'angular-gridster2';

export interface WidgetModel {
  gridItem: GridsterItem;
  widgetRefId: number;
  metadata?: any;
  values?: any;
}
