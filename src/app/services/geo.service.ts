import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  zoomTo = new Subject<any>();
  constructor() { }
}
