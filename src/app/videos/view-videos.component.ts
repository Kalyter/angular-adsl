import {Component, OnInit} from '@angular/core';
import {fadeTransition} from "../animations/fade2.animation";
import {ActivatedRoute} from "@angular/router";
import {VideosService} from "../services/videos.service";
import {DomSanitizer, Title} from "@angular/platform-browser";

@Component({
  templateUrl: './view-videos.component.html',
  animations: [fadeTransition],
  host: {'[@fadeTransition]': ''}

})
export class ViewVideosComponent implements OnInit {
  idvid:any;
  video: any = {
    title: String,
    description: String,
    youtube_id: String,
  };
  yurls: any;

  constructor(private route: ActivatedRoute,
              private videosService: VideosService,
              private sanitizer: DomSanitizer,
              private titleService: Title) {
  }

  ngOnInit() {
    this.idvid = this.route.snapshot.params['id'];
    this.yurls = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/");

    this.videosService.viewVideo(this.idvid)
      .subscribe(result => {
        this.video = result;
        this.titleService.setTitle( "Assistance Dépannage Service Labo - Vidéos -" + this.video.title );
        let yurl = 'https://www.youtube.com/embed/' + this.video.youtube_id;
        this.yurls =
          this.sanitizer.bypassSecurityTrustResourceUrl(yurl);

      });
  }


}
