import { Component, OnInit } from '@angular/core';
import {VideosService} from "../services/videos.service";
import {Title} from "@angular/platform-browser";
import {ConfigService} from "../services/config.service";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  videos: any;
  config:any = {
    title: String
  };

  constructor(private videosService: VideosService,
              private titleService: Title,
              private configService:ConfigService) { }

  ngOnInit() {
    this.getVideos();
    this.configService.currentConfig.subscribe(message => {
      this.config = message;
      this.titleService.setTitle(this.config.title+" - Vidéos");
    });
  }

  getVideos(){
    this.videosService.getVideos()
      .subscribe( result => this.videos = result);
  }

}
