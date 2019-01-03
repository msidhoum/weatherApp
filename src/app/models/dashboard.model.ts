import { WidgetModel } from './widget.model';

export interface DashboardModel {
  name: string;
  items: Array<WidgetModel>;
}
