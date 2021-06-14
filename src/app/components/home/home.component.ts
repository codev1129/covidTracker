import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/models/global-data';
import { CovidDataService } from 'src/app/services/covid-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private covidData: CovidDataService ) { }
  totalConfirmed=0;
  totalDeaths=0;
  totalActive=0;
  totalRecovered=0;
  totalData: GlobalDataSummary[]=[];
  ngOnInit(): void {
    this.covidData.getCovidData().subscribe(
      {next: (ct)=>{
        console.log(ct)
        this.totalData=ct;
        ct.forEach(res=>{
          if(!Number.isNaN(res.active)&&res.active)
          this.totalActive+=res.active;
          if(!Number.isNaN(res.deaths)&&res.deaths)
          this.totalDeaths+=res.deaths;
          if(!Number.isNaN(res.confirmed)&&res.confirmed)
          this.totalConfirmed+=res.confirmed;
          if(!Number.isNaN(res.recovered)&&res.recovered)
          this.totalRecovered+=res.recovered;
        })
      }}
    )
  }

}
