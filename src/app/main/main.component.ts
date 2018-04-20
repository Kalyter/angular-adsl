import { Component, OnInit } from '@angular/core';
import {BrandService} from "../services/brand.service";
import {Title} from "@angular/platform-browser";

@Component({
  moduleId: module.id.toString(),
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  brand:any;

  constructor(private brandService:BrandService, private titleService: Title) { }

  ngOnInit() {
    this.getBrands();
    this.titleService.setTitle( "Assistance Dépannage Service Labo - Home" );
  }

  getBrands() {
    this.brandService.getBrand()
      .subscribe(result => this.brand = result);
     // console.log(this.brand.filter(function(item, index){ index > 4 }));
  }

}
