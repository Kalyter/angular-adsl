import { Component, OnInit } from '@angular/core';
import {BrandService} from "../services/brand.service";
import {Title} from "@angular/platform-browser";
import {MenuService} from "../services/menu.service";
import {ConfigService} from "../services/config.service";

@Component({
  moduleId: module.id.toString(),
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  brand:any;
  main: any = {
    title_m: Array,
    content_m: Array,
    img_1: String,
    img_2: String
  };
  config:any = {
    title: String,
    show_brands: Number
  };

  constructor(private brandService:BrandService,
              private menuService:MenuService,
              private configService:ConfigService,
              private titleService: Title) { }

  ngOnInit() {
    this.getBrands();

    this.menuService.getMainModules()
      .subscribe(result => this.main = result);

    this.configService.currentConfig.subscribe(message => {
      this.config = message;
      this.titleService.setTitle(this.config.title+" - Home");
    });

  }

  getBrands() {
    this.brandService.getBrand()
      .subscribe(result => this.brand = result);
  }

}
