import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../services/config.service";
import {Router} from "@angular/router";

@Component({
  moduleId: module.id.toString(),
  styleUrls: ['./home-admin.component.css'],
  templateUrl: './home-admin.component.html'
})
export class HomeAdminComponent implements OnInit {
  config:any = {
    title: String,
    mail: String,
    adresse: String,
    phone: String,
    mobile: String,
    fax: String,
    show_brands: Number,
  };
  constructor(private configService: ConfigService,
              private router: Router) { }

  ngOnInit() {
    this.configService.getConfig()
      .subscribe(result => this.config = result);
  }

  handleSubmit(){
    this.configService.updateConfig(this.config);


    this.router.navigate(['admin/home']);
  }

}
