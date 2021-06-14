import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global-data';
import { CompileShallowModuleMetadata } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  private dataLink='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/06-13-2021.csv';
  constructor(private http: HttpClient) { }

  getCovidData(){
    return this.http.get(this.dataLink, {responseType: 'text'}).pipe(
      map(ct=>{
      
      let rows=ct.split('\n');
      rows.splice(0,1);
      //console.log(rows);
      let data: GlobalDataSummary[]=[];
      let raw:any={} ;
      rows.forEach(row=>{
        let cols=row.split(/,(?=\S)/);
       // console.log(cols);

      let cs = {
        country: cols[3],
        confirmed: +cols[7],
        deaths: +cols[8],
        recovered: +cols[9],
        active: +cols[10]
      };
      let temp: GlobalDataSummary = raw[cs.country];
      if(temp)
      {
        if(temp.active!==undefined)
        temp.active=cs.active+temp.active;
        if(temp.confirmed!==undefined)
        temp.confirmed=cs.confirmed+temp.confirmed;
        if(temp.deaths!==undefined)
        temp.deaths=cs.deaths+temp.deaths;
        if(temp.recovered!==undefined)
        temp.recovered=cs.recovered+temp.recovered;

        raw[cs.country]=temp;
      }
      else{
        raw[cs.country]=cs;
      }
            
      })
       // console.log(raw);
        return <GlobalDataSummary[]>Object.values(raw);
      })
    )
  }
}
