import {Component, OnInit} from '@angular/core';
import {routerTransition} from "../../animations/slide.animation";
import {VideosService} from "../../services/videos.service";
import {PubSubService} from "../../services/pub-sub.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  moduleId: module.id.toString(),
  templateUrl: 'videos-admin-edit.component.html',
  animations: [routerTransition],
  host: {'[@routerTransition]': ''}
})

export class VideosAdminEditComponent implements OnInit {
  video: any = {
    youtube_id: String,
    title: String,
    description: String,
    thumb: String
  };

  constructor(private pubsubService: PubSubService,
              private videosService: VideosService,
              private route: ActivatedRoute,
              private router:Router) {
  }

  ngOnInit() {
    let videoId = this.route.snapshot.params['id'];
    if (videoId) {
      this.videosService.viewVideo(videoId)
        .subscribe(result => this.video = result);
    }
  }


  saveVideo(){
    // Update service
    this.videosService.updateVideo(this.video, this.video._id);
    // publish event for update
    this.pubsubService.publish('video-updated');
    // redirect to video view
    this.router.navigate(['admin/videos']);
  }

}
