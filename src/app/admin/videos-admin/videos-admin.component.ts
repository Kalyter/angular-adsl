import {Component, OnDestroy, OnInit} from '@angular/core';
import {VideosService} from "../../services/videos.service";
import {Title} from "@angular/platform-browser";
import {PubSubService} from "../../services/pub-sub.service";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";

@Component({
  selector: 'app-videos-admin',
  templateUrl: './videos-admin.component.html',
  styleUrls: ['./videos-admin.component.scss']
})
export class VideosAdminComponent implements OnInit, OnDestroy {
  videos:any;
  subscription: Subscription;
  public popoverTitle: string = 'Confirmation';
  public popoverMessage: string = 'Are you sure you want to delete this video ?';
  public cancelClicked: boolean = false;

  constructor(private videosService: VideosService,
              private titleService: Title,
              private pubsubService:PubSubService,
              private router:Router) { }

  ngOnInit() {
    this.getVideos();
    this.titleService.setTitle( "Assistance Dépannage Service Labo - Admin Vidéos" );

    //check if videos are updated and reload if yes
    this.subscription = this.pubsubService.on('video-updated')
      .subscribe(() => setTimeout(() => {
        this.getVideos();
      }, 800));
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  getVideos(){
    this.videosService.getVideos()
      .subscribe(result => this.videos = result);
  }

  // delete video function
  deleteVideo(id: number) {

    this.videosService.deleteVideo(id).subscribe(res => {
      console.log('Deleted');
    });
    this.pubsubService.publish('video-updated');
    // redirect to users view
    this.router.navigate(['admin/videos']);

  }

}
