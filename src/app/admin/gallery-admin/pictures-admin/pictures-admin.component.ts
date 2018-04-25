import { Component, OnInit } from '@angular/core';
import {GalleryService} from "../../../services/gallery.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pictures-admin',
  templateUrl: './pictures-admin.component.html',
  styleUrls: ['./pictures-admin.component.scss']
})
export class PicturesAdminComponent implements OnInit {
  album: any = {
    title: String,
  };
  pictures: any;

  constructor(private galleryService: GalleryService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let albumID = this.route.snapshot.params['id'];
    this.getAlbum(albumID);
  }

  getAlbum(id){
    this.galleryService.editAlbum(id)
      .subscribe(result => {
        this.album = (Object.values(result)[0]);
        if(this.album.pictures.length>0)
        {
          this.pictures = this.album.pictures;
          console.log(this.pictures);
        }
      })
  }

}
