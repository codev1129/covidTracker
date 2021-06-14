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

}
