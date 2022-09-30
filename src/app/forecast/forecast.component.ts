import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../openWeatherService";
import {catchError, finalize} from "rxjs/operators";
import {MessageService} from "primeng/api";
import {throwError} from "rxjs";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
  providers: [MessageService]
})
export class ForecastComponent implements OnInit {

  constructor(
    private weatherService: WeatherService,
    public messageService: MessageService,
  ) {
  }

  @Input() lat = '';
  @Input() lon = '';
  forecastResult: any;
  ngOnInit(): void {
    // this.getForecast();
  }

  // getForecast() {
  //   this.weatherService.getForecast(this.lat, this.lon).pipe(catchError((error) => {
  //       console.log(error);
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Problem with getting forecast.',
  //         detail: error.error.errors.toString(),
  //       });
  //       return throwError('');
  //     }),
  //     finalize(() => {
  //     })).subscribe(res => {
  //     this.forecastResult = res;
  //   })
  // }

}
