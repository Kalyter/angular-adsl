import { Component, OnInit } from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss']
})
export class MainAdminComponent implements OnInit {
  main: any = {
    title_m: Array,
    content_m: Array,
    img_1: String,
    img_2: String
  };
  show: boolean = false;
  show2: boolean = false;
  img:any;
  searchText:any;

  constructor(private menuService: MenuService,
              private router: Router) { }

  ngOnInit() {
    this.menuService.getMainModules()
      .subscribe(result => {
        this.main = result;
        this.getImagesBrand();
      });
  }

  handleSubmit(){
  this.menuService.updateMain(this.main);

    this.router.navigate(['admin/home']);
  }

  onOpen(){
    this.show = !this.show;

      let ind = this.img.indexOf(this.main.img_1);
      if (ind > -1) {
        this.img.splice(ind, 1);
      }

      let index3 = this.img.indexOf(this.main.img_2);
      if (index3 > -1) {
        this.img.splice(index3, 1);
      }

  }

  getImagesBrand() {
    this.menuService.getImagesBrands()
      .subscribe(result => {
        this.img = result;
      });
  }

  dropOut($event, from){
    let data = $event.dragData[0];
    let index = this.img.indexOf(data);

    if (index > -1) {
      this.img.splice(index, 1);
    }

    if(from === 1){
      let old = this.main.img_1;
      this.main.img_1 = data;
      this.img.push(old);
    }
    else{
      let old = this.main.img_2;
      this.main.img_2 = data;
      this.img.push(old);
    }

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
        // posting the data
        this.menuService.uploadImages(data);
        setTimeout(() => {
          this.getImagesBrand();
        }, 800);

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

}
