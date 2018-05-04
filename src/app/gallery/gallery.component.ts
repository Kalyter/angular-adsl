import { Component, OnInit } from '@angular/core';
import {GalleryService} from "../services/gallery.service";
import {Title} from "@angular/platform-browser";
import {ConfigService} from "../services/config.service";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  albums:any;
  config:any = {
    title: String
  };

  constructor(private galleryService: GalleryService,
              private titleService: Title,
              private configService:ConfigService,) { }

  ngOnInit() {
    this.getallAlbums();
    this.configService.currentConfig.subscribe(message => {
      this.config = message;
      this.titleService.setTitle(this.config.title+" - Références");
    });
  }

  getallAlbums() {
    this.galleryService.getAlbums()
      .subscribe(result => this.albums = result);
  }

}
