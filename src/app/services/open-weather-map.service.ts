import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherMapService {

  /**
   * API key created for demo account
   */
  apiKey = 'e2051f74c85c8d39000808268368ee7a';

  constructor(private http: HttpClient) { }

  getWeatherByCityName(name: string): Observable<any> {
    return this.http.get<any>(`http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${this.apiKey}`);
  }

  getWeatherByCityId(id: string): Observable<any> {
    return this.http.get<any>(`http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${this.apiKey}`);
  }
}
