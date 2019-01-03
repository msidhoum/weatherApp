import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardModel } from '../models/dashboard.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  dashboard: DashboardModel;
  widgetsRegistry: Array<any>;
  installWidget = new Subject<any>();

  constructor(private http: HttpClient) {
    // TODO improve this part by fetching data from http service
    this.dashboard = <DashboardModel>{
      'name': 'User Weather Dashboard',
      'items': [
        {
          'gridItem': {
            'cols': 2,
            'rows': 2,
            'x': 0,
            'y': 0,
            'minItemCols': 1,
            'minItemRows': 1
          },
          'widgetRefId': 0,
          'values': {
            'cityCode': 2643743
          }
        },
        {
          'gridItem': {
            'cols': 2,
            'rows': 2,
            'x': 0,
            'y': 2,
            'minItemCols': 1,
            'minItemRows': 1
          },
          'widgetRefId': 0,
          'values': {
            'cityCode': 2992166
          }
        },
        {
          'gridItem': {
            'cols': 4,
            'rows': 4,
            'x': 2,
            'y': 0,
            'minItemCols': 1,
            'minItemRows': 1
          },
          'widgetRefId': 1
        }
      ]
    };

    this.loadData().subscribe(data => {
      this.widgetsRegistry = data.widgetsRegistry;
    });

  }

  loadData(): Observable<any> {
    return this.http.get<any>('assets/json/data.json');
  }

  getWidgetById(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.widgetsRegistry) {
        resolve(this.widgetsRegistry.find(w => w.id === id));
      } else {
        this.loadData().subscribe(data => {
          this.widgetsRegistry = data.widgetsRegistry;
          resolve(data.widgetsRegistry.find(w => w.id === id));
        });
      }
    });
  }

  getUserDashboard(): DashboardModel {
    return this.dashboard;
  }

}
