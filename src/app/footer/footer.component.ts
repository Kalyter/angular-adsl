import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../services/config.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  config:any = {
    adresse: String,
    phone: String,
    mobile: String,
    fax: String,
    mail: String
  };
  adresse: string;
  constructor(private configService: ConfigService,
              private titleService: Title) { }

  ngOnInit() {

    this.configService.getConfig()
      .subscribe(result => {
        this.configService.currentConfig.subscribe(message => {
          this.config = message;
          let text = this.config.adresse;
          this.adresse = text.replace(/\r?\n/g, '<br />');
          this.titleService.setTitle(this.config.title);
        });
      });

  }

}
