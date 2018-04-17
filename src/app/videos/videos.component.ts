import { Component, OnInit } from '@angular/core';
import {VideosService} from "../services/videos.service";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  videos: any;

  constructor(private videosService: VideosService,) { }

  ngOnInit() {
    this.getVideos();
  }

  getVideos(){
    this.videosService.getVideos()
      .subscribe( result => this.videos = result);
  }

}
