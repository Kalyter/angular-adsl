import {Component, OnInit} from '@angular/core';
import {routerTransition} from "../../animations/slide.animation";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map'
import { environment } from '../../../environments/environment';
import {VideosService} from "../../services/videos.service";
import {PubSubService} from "../../services/pub-sub.service";
import {Router} from "@angular/router";

@Component({
  moduleId: module.id.toString(),
  templateUrl: 'videos-admin-add.component.html',
  animations: [routerTransition],
  host: {'[@routerTransition]': ''}
})

export class VideosAdminAddComponent implements OnInit {
  link:any;
  infos:any;
  video: any = {
    youtube_id: String,
    title: String,
    description: String,
    thumb: String
  };
  show: boolean = false;

  constructor(private _http: HttpClient,
              private pubsubService: PubSubService,
              private videosService: VideosService,
              private router:Router) {
  }

  ngOnInit() {

    }

  handleSubmit(){
    event.preventDefault();
    let apikey = environment.youtube_api;
    let link_id = this.link.match('(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})');
    let api = "https://www.googleapis.com/youtube/v3/videos?id="+link_id[1]+"&key="+apikey+"&part=snippet";

    this._http
      .get(api)
      .map(res => res)
      .subscribe(result => {
        this.infos = result;
        this.video.youtube_id = this.infos.items[0].id;
        this.video.title = this.infos.items[0].snippet.title;
        this.video.description = this.infos.items[0].snippet.description;

        if(typeof this.infos.items[0].snippet.thumbnails.standard === "undefined" )
        {
          this.video.thumb = this.infos.items[0].snippet.thumbnails.high.url;
        }
        else{
          this.video.thumb = this.infos.items[0].snippet.thumbnails.standard.url;
        }
        this.show = true;
      });
  }

  saveVideo(){
    // save video
    this.videosService.addVideo(this.video);
    // publish event for update
    this.pubsubService.publish('video-updated');
    // redirect to video view
    this.router.navigate(['admin/videos']);
  }

}
