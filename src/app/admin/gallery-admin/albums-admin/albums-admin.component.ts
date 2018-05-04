import {Component, OnDestroy, OnInit} from '@angular/core';
import {PubSubService} from "../../../services/pub-sub.service";
import {Router} from "@angular/router";
import {GalleryService} from "../../../services/gallery.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-albums-admin',
  templateUrl: './albums-admin.component.html',
  styleUrls: ['./albums-admin.component.scss']
})
export class AlbumsAdminComponent implements OnInit, OnDestroy {
  albums:any;
  subscription: Subscription;
  title:any;
  public popoverTitle: string = 'Confirmation';
  public popoverMessage: string = 'Are you sure you want to delete this album ?';
  public cancelClicked: boolean = false;
  constructor(private galleryService: GalleryService,
              private pubsubService: PubSubService,
              private router: Router) { }

  ngOnInit() {
    this.getallAlbums();

    this.subscription = this.pubsubService.on('albums-updated')
      .subscribe(() => setTimeout(() => {
        this.getallAlbums();
      }, 800));
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  // get menu function + get last order
  getallAlbums() {
    this.galleryService.getAlbums()
      .subscribe(result => this.albums = result);
  }

  // order menu update
  OrderAlbums($i, $event) {

    $event.forEach((item, key) => {
      item.order = key + 1;
    });
    this.galleryService.updateOrder($event);
    this.pubsubService.publish('albums-updated');
    // redirect to users view
    this.router.navigate(['admin/gallery']);
  }

  changeTitle(e, id){
    const host = e.target as HTMLElement;
    host.setAttribute("style", "display:none;")
    let tag = id+"form";
    const form = document.getElementById(tag) as HTMLElement;
    form.removeAttribute("style");
  }

  saveTitle(e, obj){
    const host = e.target as HTMLElement;
    host.setAttribute("style", "display:none;")
    let tag = obj._id+"div";
    const divtitle = document.getElementById(tag) as HTMLElement;
    divtitle.removeAttribute("style");

    this.galleryService.updateAlbum(obj);
    this.pubsubService.publish('albums-updated');
    // redirect to users view
    this.router.navigate(['admin/gallery']);
  }

  addAlbum(){
    let order = this.albums.length+1;
    let newalbum = {
      title: 'Nouveau album',
      order: order
    };

    this.galleryService.addAlbum(newalbum);
    setTimeout(() => {
      this.getallAlbums();
    }, 500);

  }

  deleteAlbum(id: number) {

    this.galleryService.deleteAlbum(id).subscribe(res => {
      console.log('Deleted');
      this.getallAlbums();
    });

  }

}
