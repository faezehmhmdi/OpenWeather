import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';

const API_Key: string = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
/*
* The service for getting data from API
*/
export class WeatherService {
  constructor(private http: HttpClient) {
  }

  //The JSON file of cities of Sweden including their geolocation
  private _jsonURL = "/assets/Sweden_Cities.json";

  //Function for getting the cities JSON
  getListOfCities() {
    return this.http.get(this._jsonURL);
  }

  //Function for getting the current weather information in celsius by geolocation
  getCurrentWeather(lat: string, lon: string) {
    return this.http.get(environment.openWeather + '/weather?lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + API_Key)
  }

  //Function for getting the weather forecast information in celsius by geolocation
  getForecast(lat: string, lon: string) {
    return this.http.get<any>(environment.openWeather + '/forecast?lat=' + lat + '&lon=' + lon + '&units=metric&appid=' + API_Key)
  }

  //Function for getting the air quality information by geolocation
  getPollution(lat: string, lon: string) {
    return this.http.get(environment.openWeather + '/air_pollution?lat=' + lat + '&lon=' + lon + '&appid=' + API_Key)
  }


}
