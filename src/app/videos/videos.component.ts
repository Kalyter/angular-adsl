import { Component, OnInit } from '@angular/core';
import {VideosService} from "../services/videos.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  videos: any;

  constructor(private videosService: VideosService, private titleService: Title) { }

  ngOnInit() {
    this.getVideos();
    this.titleService.setTitle( "Assistance Dépannage Service Labo - Vidéos" );
  }

  getVideos(){
    this.videosService.getVideos()
      .subscribe( result => this.videos = result);
  }

}
