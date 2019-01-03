import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { OpenWeatherMapService } from 'src/app/services/open-weather-map.service';
import { WidgetModel } from 'src/app/models/widget.model';
import { GeoService } from 'src/app/services/geo.service';

export interface BasicSelectOption {
  value: any;
  label: string;
}

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeatherCardComponent implements OnInit {
  @Input() widgetModel: WidgetModel;
  configMode = false;
  cityId: string;
  cityName: string;
  temperature: string;
  location: any;
  weatherIcon = {
    className: '',
    owmIconUrl: ''
  };
  options: BasicSelectOption[] = [];

  constructor(private openWeatherMapService: OpenWeatherMapService,
    private geoService: GeoService) { }

  ngOnInit() {
    if (this.widgetModel.metadata) {
      this.options = [];
      this.widgetModel.metadata.widgetValues.cities.forEach(city => {
        this.options.push({ 'value': city.id, 'label': city.name });
      });
      // sorting array on property 'label'
      this.options.sort((a, b) => a.label.localeCompare(b.label));
    }

    if (this.widgetModel.values && this.widgetModel.values.cityCode) {
      this.loadWeatherForCity(this.widgetModel.values.cityCode);
    } else {
      this.configMode = true;
    }

  }

  onChangeCity(eventValue: string) {
    const values = { cityCode: eventValue };
    this.widgetModel.values = values;
    this.loadWeatherForCity(eventValue);
  }

  loadWeatherForCity(code: string): void {
    this.openWeatherMapService.getWeatherByCityId(code).subscribe(response => {
      this.configMode = false;
      const name = response.name === 'Marino' ? 'Rome' : response.name;
      this.cityName = name + ', ' + response.sys.country;
      this.location = response.coord;
      if (response.weather) {
        const tempCelsius = response.main.temp - 273.15; // Kelvin to Celsius;
        this.temperature = tempCelsius.toFixed(1);
        let timeDay = 'day';
        if (response.weather[0].icon.endsWith('n')) {
          timeDay = 'night';
        }
        this.weatherIcon.className = 'wi-owm-' + timeDay + '-' + response.weather[0].id;
        this.weatherIcon.owmIconUrl = 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png';
      }

    });
  }

  zoomToLocation(): void {
    this.geoService.zoomTo.next(this.location);
  }

}
