import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  private dataLink='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/06-11-2021.csv';
  constructor(private http: HttpClient) { }

  getCovidData(){
    return this.http.get(this.dataLink, {responseType: 'text'}).pipe(
      map(ct=>{
        return ct;
      })
    )
  }
}
