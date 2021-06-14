import { CssSelector } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { CovidDataService } from 'src/app/services/covid-data.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  constructor(private service: CovidDataService) { }
  data: GlobalDataSummary[]=[];
  totalConfirmed=0;
  totalDeaths=0;
  totalActive=0;
  totalRecovered=0;
  countries: string[]=[];
  ngOnInit(): void {
    this.service.getCovidData()
    .subscribe(res=>{
      this.data=res;
      this.data.forEach(ct=>{
        if(ct.country)
        this.countries.push(ct.country);
      })
    })
  }

  updateValues(country: string)
  {
    console.log(country);
    this.data.forEach(ct=>{
      if(ct.country==country)
      {
        if(ct.active)
        this.totalActive=ct.active;
        if(ct.deaths)
        this.totalDeaths=ct.deaths;
        if(ct.confirmed)
        this.totalConfirmed=ct.confirmed;
        if(ct.recovered)
        this.totalRecovered=ct.recovered;

      }
    })
  }

}
