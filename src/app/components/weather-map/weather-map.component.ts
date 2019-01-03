import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { WidgetModel } from 'src/app/models/widget.model';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { fromLonLat } from 'ol/proj.js';
import XYZ from 'ol/source/XYZ';
import { GeoService } from 'src/app/services/geo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather-map',
  templateUrl: './weather-map.component.html',
  styleUrls: ['./weather-map.component.scss']
})
export class WeatherMapComponent implements OnInit, OnDestroy {
  @ViewChild('mapContainer')
  public mapContainer: ElementRef;

  @Input() widgetModel: WidgetModel;

  zoomToSubscription: Subscription;

  map: Map;
  view: View;

  constructor(private geoService: GeoService) { }

  ngOnInit() {
    setTimeout(() => {
      this.view = new View({
        center: [0, 0],
        zoom: 2
      });
      this.map = new Map({
        target: this.mapContainer.nativeElement,
        layers: [
          new TileLayer({
            source: new XYZ({
              url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              // url: 'https://cartodb-basemaps-d.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
            })
          }),
          new TileLayer({
            source: new XYZ({
              // url: 'http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid=e2051f74c85c8d39000808268368ee7a&fill_bound'
              // url: 'https://a.sat.owm.io/vane/2.0/weather/TA2/{z}/{x}/{y}?appid=9de243494c0b295cca9337e1e96b00e2&fill_bound'
              url: 'https://d.sat.owm.io/vane/2.0/weather/PA0/{z}/{x}/{y}?appid=9de243494c0b295cca9337e1e96b00e2'
            })
          }),
          new TileLayer({
            source: new XYZ({
              // url: 'http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?appid=e2051f74c85c8d39000808268368ee7a&fill_bound'
              url: 'https://a.sat.owm.io/vane/2.0/weather/TA2/{z}/{x}/{y}?appid=9de243494c0b295cca9337e1e96b00e2&fill_bound'
              // url: 'https://d.sat.owm.io/vane/2.0/weather/PA0/{z}/{x}/{y}?appid=9de243494c0b295cca9337e1e96b00e2'
            })
          })
        ],
        view: this.view
      });
    }, 200);

    this.zoomToSubscription = this.geoService.zoomTo.subscribe((location: any) => {
      const loc = fromLonLat([location.lon, location.lat]);
      this.flyTo(loc);
    });
  }

  flyTo(location) {
    const duration = 2000;
    const zoom = 8; // this.view.getZoom();
    let parts = 2;
    let called = false;
    function callback(complete) {
      --parts;
      if (called) {
        return;
      }
      if (parts === 0 || !complete) {
        called = true;
      }
    }
    this.view.animate({
      center: location,
      duration: duration
    }, callback);
    this.view.animate({
      zoom: zoom - 1,
      duration: duration / 2
    }, {
        zoom: zoom,
        duration: duration / 2
      }, callback);
  }

  ngOnDestroy() {
    this.zoomToSubscription.unsubscribe();
  }

}
