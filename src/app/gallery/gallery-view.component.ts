import { Component, OnInit } from '@angular/core';
import {GalleryService} from "../services/gallery.service";
import {Title} from "@angular/platform-browser";
import {fadeTransition} from "../animations/fade2.animation";
import {ActivatedRoute} from "@angular/router";
import {ConfigService} from "../services/config.service";

@Component({
  selector: 'app-gallery-view',
  templateUrl: './gallery-view.component.html',
  animations: [fadeTransition],
  host: {'[@fadeTransition]': ''}
})
export class GalleryViewComponent implements OnInit {
  picture:any = {
    title: String,
    link: String
  };
  id: number;
  config:any = {
    title: String
  };
  constructor(private galleryService: GalleryService,
              private titleService: Title,
              private configService:ConfigService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.galleryService.viewPicture(this.id)
      .subscribe(result => {
        this.picture = (Object.values(result)[0]);

        this.configService.currentConfig.subscribe(message => {
          this.config = message;
          this.titleService.setTitle(this.config.title+" - Références - "  + this.picture.title);
        });

      });
  }


}
