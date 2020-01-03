import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { LineChartComponent } from './line-chart/line-chart.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LastTemperatureComponent } from './last-temperature/last-temperature.component';
import { HttpClientModule } from '@angular/common/http';
import { TemperaturesService } from './services/temperatures.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    HeaderComponent,
    FooterComponent,
    LastTemperatureComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    TemperaturesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
