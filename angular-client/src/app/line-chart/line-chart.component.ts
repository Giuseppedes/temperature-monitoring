import {Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import {ChartDataSets, ChartOptions} from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import {TemperaturesService} from '../services/temperatures.service';
import {DatePipe, isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  isBrowser;

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Temperature ( °C )' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [{}]
    },
    annotation: {
      annotations: [
        {
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  dateFormat;

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;


  constructor(private temperaturesService: TemperaturesService, private datePipe: DatePipe, @Inject(PLATFORM_ID) private platformId: any) {
    this.dateFormat = 'dd/MM/yyyy HH:mm';
  }

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.temperaturesService.temperatureListObservable.subscribe(value => {
        if (this.getDaysBetweenDates(value[0].time, value[value.length - 1].time) > (1000 * 60 * 60 * 24) ) {
          // difference between first and last measurement is more then one day
          this.dateFormat = 'dd/MM/yyyy HH:mm';
        } else {
          this.dateFormat = 'HH:mm';
        }
        this.lineChartData = [{ data: value.map(element => element.temperature), label: 'Temperature ( °C )'}];
        this.lineChartLabels = value.map(element => this.datePipe.transform( element.time, this.dateFormat));
      }, (error) => {console.log(error)});
    }
  }

  getDaysBetweenDates(startDate: Date, endDate: Date) {
    const startDateBis = new Date(startDate);
    const endDateBis = new Date(endDate);
    return (endDateBis.getTime() - startDateBis.getTime());
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }


}
