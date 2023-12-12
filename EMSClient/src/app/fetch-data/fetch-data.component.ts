import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})

export class FetchDataComponent {
  forecasts: WeatherForecast[] = [];
  baseURL: string = 'https://localhost:4200';


    constructor(http: HttpClient){
      http.get<WeatherForecast[]>(this.baseURL + '/weatherforecast').subscribe({
        next: result => {
          this.forecasts = result;
        },
        error: error => {
          console.error(error);
        }
      })
    }
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}