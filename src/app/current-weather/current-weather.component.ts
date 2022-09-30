import {Component, OnInit, OnChanges, Input} from '@angular/core';
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
  //Lat and Long are the Inputs that the parent (App Component) provides for the child (Current weather component)
  @Input() lat = '';
  @Input() lon = '';

  //Variables
  currentWeatherResult: any;
  forecastResult: any;
  airPollutionResult: any;
  weatherIconUrl: any;
  forecastIconsUrls: any;
  listOfCities: any;
  //List of possible responses of air pollution API with their label and value
  airQuality = [
    {label: 'Good', value: 1},
    {label: 'Fair', value: 2},
    {label: 'Moderate', value: 3},
    {label: 'Poor', value: 4},
    {label: 'Very Poor', value: 5}
  ];
  airQualityLabel: any;

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.getCurrentWeather();
    this.getForecast();
    this.getAirPollution();
  }

  //Function for getting the current weather information form service
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

  //Function for returning the url of weather icon
  getWeatherIcon(code: string) {
    return 'http://openweathermap.org/img/wn/' + code + '@2x.png'
  }

  //Function for getting the forecast weather information form service
  getForecast() {
    this.forecastResult = [];
    this.forecastIconsUrls = []
    this.weatherService.getForecast(this.lat, this.lon).pipe(catchError((error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Problem with getting forecast.',
          detail: error.error.errors.toString(),
        });
        return throwError('');
      }),
      finalize(() => {
      })).subscribe(res => {
        for (let i = 0; i < res['list'].length; i +=8) {
          this.forecastResult.push(res['list'][i])
        }
    })
  }

  //Function for getting the air pollution information form service
  getAirPollution() {
    this.weatherService.getPollution(this.lat, this.lon).pipe().subscribe(res => {
      this.airPollutionResult = res;
      // @ts-ignore
      this.airQualityLabel = this.airQuality.find(o => o.value == this.airPollutionResult['list'][0].main.aqi).label
    })
  }
}
