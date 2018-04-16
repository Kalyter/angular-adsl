import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {PubSubService} from "../../services/pub-sub.service";
import {CategoriesService} from "../../services/categories.service";
import {ArticlesService} from "../../services/articles.service";
import {fadeTransition} from "../../animations/fade2.animation";
import {BrandService} from "../../services/brand.service";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
  moduleId: module.id.toString(),
  templateUrl: 'articles-admin-add.component.html',
  animations: [fadeTransition],
  host: {'[@fadeTransition]': ''}
})

export class ArticlesAdminAddComponent implements OnInit {
  title = "Add Articles";
  listcat: any;
  img:any;
  principale: String;
  multiple = [];
  show: boolean = false;
  show2: boolean = false;
  editId:number;
  searchText:any;
  articles: any = {
    title: String,
    img_head: String,
    img_plus: Array,
    cat_id: Number,
    brand_id: Number,
    content: String
  };
  file:any;
  listbrand:any;
  statusCreateForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoriesService: CategoriesService,
              private brandService: BrandService,
              private articleService: ArticlesService,
              private pubsubService: PubSubService) {}


  ngOnInit() {
   this.getCategories();
   this.getImagesArticles();
   this.getBrands();

    // check if add or edit via id params
    this.editId = this.route.snapshot.params['id'];

    //Form controls & FormGroup
    this.articles.title  = new FormControl("", [
      Validators.required
    ]);
    this.articles.cat_id  = new FormControl("", [
      Validators.required
    ]);
    this.articles.brand_id  = new FormControl("", [
      Validators.required
    ]);
    this.articles.content  = new FormControl("", [
      Validators.required
    ]);

    this.statusCreateForm = new FormGroup({
      'title':  this.articles.title,
      'cat_id': this.articles.cat_id,
      'brand_id': this.articles.brand_id,
      'content': this.articles.content
    });

    // If edit page, push content in field
    if (this.editId) {
      this.title = 'Edit Articles';

      this.articleService.editArticle(this.editId)
        .subscribe(result => {
          this.articles = result;
          if(typeof this.articles.img_head !== 'undefined' || typeof this.articles.img_plus !== 'undefined')
          {
            this.principale = this.articles.img_head;
            this.multiple = this.articles.img_plus;
          }

          (<FormControl>this.statusCreateForm.controls['title'])
            .setValue(this.articles.title);
          (<FormControl>this.statusCreateForm.controls['cat_id'])
            .setValue(this.articles.cat_id);
          (<FormControl>this.statusCreateForm.controls['brand_id'])
            .setValue(this.articles.brand_id);
          (<FormControl>this.statusCreateForm.controls['content'])
            .setValue(this.articles.content);
        });

    }
  }


  // add/edit categories function
  handleSubmit(statusNgForm:NgForm, statusCreateForm:FormGroup) {
    event.preventDefault();

    //If form is submitted
    if (statusNgForm.submitted) {

      //Get value in articles object
      this.articles = statusCreateForm.value;
      this.articles._id = this.editId;
      this.articles.img_head = this.principale;
      this.articles.img_plus = this.multiple;

      // check if new or edit
      if (!this.articles._id) {

        this.articleService.addArticle(this.articles);
      }
      else{
        this.articleService.updateArticle(this.articles, this.articles._id);
      }


      console.log(this.articles);



      // publish event for update/add
      this.pubsubService.publish('articles-updated');
      // redirect to users view
      this.router.navigate(['admin/articles']);

    }
  }

  getCategories(){
    this.categoriesService.getCategories()
      .subscribe(result => this.listcat = result);
  }

  getBrands(){
    this.brandService.getBrand()
      .subscribe(result => this.listbrand = result)
  }

  getImagesArticles(){
    this.articleService.getImagesArticles()
      .subscribe(result => {
        this.img = result;

      });
  }

  dropOne($event)
  {
    var data = $event.dragData[0];
    var from = $event.dragData[1];
    var index = this.img.indexOf(data);

    if(from != "principale") {

      if (index > -1) {
        this.img.splice(index, 1);
      }

      if (this.principale) {
        this.img.push(this.principale);
      }

      if(from == "multiple"){
        let index2 = this.multiple.indexOf(data);
        if (index2 > -1) {
          this.multiple.splice(index2, 1);
        }
      }

      this.principale = data;
    }
  }

  dropMulti($event)
  {
    var data = $event.dragData[0];
    var from = $event.dragData[1];
    var index = this.img.indexOf(data);

    if(from != "multiple") {
      if (index > -1) {
        this.img.splice(index, 1);
      }

      if(from == "principale"){
          this.principale = "";
      }

      this.multiple.push(data);
    }
  }

  dropOut($event)
  {
    var data = $event.dragData[0];
    var from = $event.dragData[1];

    if (from == "multiple"){

      var index = this.multiple.indexOf(data);

      if (index > -1) {
        this.multiple.splice(index, 1);
      }

      this.img.push(data);

    }else if (from == "principale") {

      this.principale = "";
      this.img.push(data);
    }
    else {}
  }

  onOpen(){
    this.show = !this.show;

    this.multiple.forEach((item, index) => {
      console.log(item);
      let ind = this.img.indexOf(item);

      if (ind > -1) {
        this.img.splice(ind, 1);
      }

    });

    let index3 = this.img.indexOf(this.principale);
    if (index3 > -1) {
      this.img.splice(index3, 1);
    }
  }

  transferDataSuccess($event) {
    console.log($event);

      // let dataTransfer: DataTransfer = $event.mouseEvent.dataTransfer;

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

        // collecting the data to post
        var data = new FormData();
        data.append('file', file);
        data.append('fileName', file.name);
        data.append('fileType', file.type);
        data.append('fileLastMod', file.lastModifiedDate);
        console.log(data);
        // posting the data
        this.articleService.uploadImages(data);
        setTimeout(() => {
          this.img.push(file.name);
        }, 1000);

      }
    }
  }

}
