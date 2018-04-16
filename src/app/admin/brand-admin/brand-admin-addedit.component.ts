import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {routerTransition} from "../../animations/slide.animation";
import {PubSubService} from "../../services/pub-sub.service";
import {BrandService} from "../../services/brand.service";

@Component({
  moduleId: module.id.toString(),
  templateUrl: 'brand-admin-addedit.component.html',
  animations: [routerTransition],
  host: {'[@routerTransition]': ''}
})

export class BrandAdminAddeditComponent implements OnInit {
  title = "Add Brand";
  brand: any = {};
  fileToUpload: File = null;
  fileUploadSub: any;

  @ViewChild('myInput')
  myFileInput: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private brandService: BrandService,
              private http: HttpClient,
              private pubsubService: PubSubService) {
  }

  ngOnInit() {

    //check if add or edit brand
    let menuId = this.route.snapshot.params['id'];
    if (menuId) {
      this.title = 'Edit Brand';
      this.brandService.editBrand(menuId)
        .subscribe(result => this.brand = result);
    }

  }

  ngOnDestroy() {
    if (this.fileUploadSub) {
      this.fileUploadSub.unsubscribe()
    }
  }

  // add/edit events
  handleSubmit() {
    event.preventDefault()

    let str = this.brand.title;
    str = this.normaLize(str);

    //check if add or edit
    if (this.brand._id >= 0) {
      //check if there is a file to upload
      if (this.fileToUpload) {
        let formData = new FormData();
        formData.append('photo', this.fileToUpload, str);
        this.brandService.uploadEditBrand(formData, this.brand, this.brand._id);
      }
      else {
        this.brandService.updateBrand(this.brand, this.brand._id);
      }
    } // add part
    else {
      if (this.fileToUpload) {
        let formData = new FormData();
        formData.append('photo', this.fileToUpload, str);
        this.brandService.uploadBrand(formData, this.brand);
      }
      else {
        this.brandService.addBrand(this.brand);
      }
    }

    // publish event for update
    this.pubsubService.publish('brand-updated');
    // redirect to brand view
    this.router.navigate(['admin/brand']);
  }

  // check if file update
  handleFileInput(files: FileList) {
    let fileItem = files.item(0);
    console.log("file input has changed. The file is", fileItem)
    this.fileToUpload = fileItem
  }

  resetFileInput() {
    console.log(this.myFileInput.nativeElement.files);
    this.myFileInput.nativeElement.value = "";
    console.log(this.myFileInput.nativeElement.files);
  }

  //normalize filename thought the title
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
