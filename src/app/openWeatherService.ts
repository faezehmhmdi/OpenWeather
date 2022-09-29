import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import * as moment from 'moment';

const API_Key: string = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {
  }

  private _jsonURL = "/assets/Sweden_Cities.json";

  getListOfCities() {
    return this.http.get(this._jsonURL);
  }

  getCurrentWeather(lat: string, lon: string) {
    // let lat = '57.6717';
    // let lon = '11.9810'
    return this.http.get(environment.openWeather + '/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + API_Key)
  }

  getForecast(lat: string, lon: string) {
    return this.http.get(environment.openWeather + '/forecast?lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + API_Key)
  }


}
