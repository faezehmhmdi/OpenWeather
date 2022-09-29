import {Component, OnInit, Input} from '@angular/core';
import {WeatherService} from "../openWeatherService";
import {catchError, finalize} from "rxjs/operators";
import {MessageService} from "primeng/api";
import {throwError} from "rxjs";

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
  providers: [MessageService]
})
export class CurrentWeatherComponent implements OnInit {

  constructor(
    private weatherService: WeatherService,
    public messageService: MessageService,
  ) {
  }

  @Input() lat = '';
  @Input() lon = '';
  currentWeatherResult: any;
  weatherIconUrl: any;
  today = Date.now();

  ngOnInit(): void {
    this.getCurrentWeather();
  }

  getCurrentWeather() {
    this.weatherService.getCurrentWeather(this.lat, this.lon).pipe(catchError((error) => {
        console.log(error.message);
        this.messageService.add({
          severity: 'error',
          summary: 'Problem with getting current weather.',
          detail: error.error.message,
        });
        return throwError('');
      }),
      finalize(() => {
      })).subscribe(res => {
      this.currentWeatherResult = res;
      this.weatherIconUrl = this.getWeatherIcon(this.currentWeatherResult['weather'][0].icon)
    })
  }

  getWeatherIcon(code: string) {
    return 'http://openweathermap.org/img/wn/' + code + '@2x.png'
  }

}
