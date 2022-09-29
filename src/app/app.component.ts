import {Component, OnInit} from '@angular/core';
import {WeatherService} from "./openWeatherService";
import {MessageService, SelectItem} from "primeng/api";
import {Position} from "@angular/compiler";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {
  constructor(
    private weatherService: WeatherService,
    public messageService: MessageService) {
  }

  listOfCities: any;
  title = 'open-weather';
  lat: any;
  lon: any;

  ngOnInit(): void {
    this.weatherService.getListOfCities().pipe().subscribe(res => {
      this.listOfCities = res;
    })
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
          if (position) {
            console.log("Latitude: " + position.coords.latitude +
              "Longitude: " + position.coords.longitude);
            this.lat = position.coords.latitude;
            this.lon = position.coords.longitude;
            console.log(this.lat);
            console.log(this.lon);
          }
        },
        (error) => console.log(error));
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Geolocation Error.',
        detail: 'Geolocation is not supported by this browser. Please Select your city from the list.'
      })
    }
  }
}
