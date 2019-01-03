import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MaterialModule } from './components/material/material.module';
import { GridsterModule } from 'angular-gridster2';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DynamicModule } from 'ng-dynamic-component';
import { DynamicComponent } from './components/dynamic/dynamic.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { WeatherMapComponent } from './components/weather-map/weather-map.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SettingsComponent,
    DynamicComponent,
    WeatherCardComponent,
    WeatherMapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    GridsterModule,
    FlexLayoutModule,
    DynamicModule.withComponents([WeatherCardComponent, WeatherMapComponent])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
