import {
  Component, EventEmitter, Input, OnInit, Output
} from '@angular/core';
import { WidgetModel } from 'src/app/models/widget.model';
import { StoreService } from 'src/app/services/store.service';
import { WeatherCardComponent } from '../weather-card/weather-card.component';
import { WeatherMapComponent } from '../weather-map/weather-map.component';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit {
  @Input() widgetModel: WidgetModel;
  @Input() edition: boolean;
  @Output() removeItemEvent = new EventEmitter<WidgetModel>();
  component: any;
  widgetInfos: any;

  /**
   * passing inputs to dynamic component
   */
  inputs = {
    widgetModel: null
  };

  constructor(private storeService: StoreService) {
  }

  ngOnInit() {

    // resolve the widget metadata and get the angular component behind the name value of ngComponent property
    this.storeService.getWidgetById(this.widgetModel.widgetRefId).then((metadata: any) => {
      this.widgetInfos = metadata;
      switch (metadata.ngComponent) {
        case 'WeatherCardComponent':
          this.component = WeatherCardComponent;
          break;
        case 'WeatherMapComponent':
          this.component = WeatherMapComponent;
          break;
      }
      this.widgetModel.metadata = metadata;
      this.inputs.widgetModel = this.widgetModel;
    });
  }

  removeItem(item: WidgetModel) {
    this.removeItemEvent.emit(item);
  }

}
