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
  albumID:any;
  pictures: any;
  show2 : boolean = false;
  public popoverTitle: string = 'Confirmation';
  public popoverMessage: string = 'Are you sure you want to delete this picture ?';
  public cancelClicked: boolean = false;

  constructor(private galleryService: GalleryService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.albumID = this.route.snapshot.params['id'];
    this.getAlbum(this.albumID);
  }

  getAlbum(id){
    this.galleryService.editAlbum(id)
      .subscribe(result => {
        this.album = (Object.values(result)[0]);
        if(this.album.pictures.length>0)
        {
          this.pictures = this.album.pictures;
        }
      })
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
    this.galleryService.updatePicture(obj);

  }

  transferDataSuccess($event) {

    let dataTransfer: DataTransfer =  $event;
    let progress = document.getElementById('percent');

    function updateProgress(evt) {
      // evt is an ProgressEvent.
      if (evt.lengthComputable) {
        let percentLoaded = Math.round((evt.loaded / evt.total) * 100);
        // Increase the progress bar length.
        if (percentLoaded < 100) {
          progress.style.width = percentLoaded + '%';
          progress.textContent = percentLoaded + '%';
        }
      }
    }

    if (dataTransfer && dataTransfer.files) {

      // needed to support posting binaries and usual form values
      let headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');

      let files: FileList = dataTransfer.files;

      // uploading the files one by one asynchrounusly
      for (let i = 0; i < files.length; i++) {

        let file: File = files[i];

        var reader = new FileReader();

        reader.onprogress = updateProgress;
        reader.onloadstart = function(e) {
          document.getElementById('progress_bar').className = 'loading';
        };
        reader.onload = (function(theFile) {

          return function(e) {
            // Render thumbnail.
            progress.style.width = '100%';
            progress.textContent = '100%';
            setTimeout("document.getElementById('progress_bar').className='';", 2000);
            var span = document.createElement('span');
            span.innerHTML = ['<img class="thumb" src="', e.target.result,
              '" title="', theFile.name, '"/>'].join('');
            document.getElementById('list').insertBefore(span, null);
          };
        })(file);

        // Read in the image file as a data URL.
        reader.readAsDataURL(file);



        // just for debugging
        console.log('Name: ' + file.name + '\n Type: ' + file.type + '\n Size: ' + file.size + '\n Date: ' + file.lastModifiedDate);
        let newname = this.normaLize(file.name);

        // collecting the data to post
        var data = new FormData();
        data.append('file', file, newname);
        data.append('fileName', newname);
        data.append('fileType', file.type);
        data.append('fileLastMod', file.lastModifiedDate);
        console.log(data);
        // posting the data
        this.galleryService.uploadImages(this.albumID, data);
        setTimeout(() => {
          this.getAlbum(this.albumID);
        }, 2000);

      }
    }
  }

  normaLize(a) {
    var r = a.toLowerCase();
    r = r.replace(new RegExp("\\s", 'g'), "");
    r = r.replace(new RegExp("[àáâãäå]", 'g'), "a");
    r = r.replace(new RegExp("æ", 'g'), "ae");
    r = r.replace(new RegExp("ç", 'g'), "c");
    r = r.replace(new RegExp("[èéêë]", 'g'), "e");
    r = r.replace(new RegExp("[ìíîï]", 'g'), "i");
    r = r.replace(new RegExp("ñ", 'g'), "n");
    r = r.replace(new RegExp("[òóôõö]", 'g'), "o");
    r = r.replace(new RegExp("œ", 'g'), "oe");
    r = r.replace(new RegExp("[ùúûü]", 'g'), "u");
    r = r.replace(new RegExp("[ýÿ]", 'g'), "y");
    r = r.replace(new RegExp("\\W", 'g'), "");
    return r;
  };

  deletePicture(id: number) {

    this.galleryService.deletePicture(id).subscribe(res => {
      console.log('Deleted');
      this.getAlbum(this.albumID);
    });

  }



}
