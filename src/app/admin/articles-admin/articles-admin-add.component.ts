import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MenuService} from "../../../services/menu.service";
import {routerTransition} from "../../animations/slide.animation";
import {PubSubService} from "../../../services/pub-sub.service";
import {CategoriesService} from "../../../services/categories.service";
import {ArticlesService} from "../../../services/articles.service";

@Component({
  moduleId: module.id.toString(),
  templateUrl: 'articles-admin-add.component.html',
  animations: [routerTransition],
  host: {'[@routerTransition]': ''}
})

export class ArticlesAdminAddComponent implements OnInit {
  title = "Add Articles";
  categories: any;
  img:any;
  principale: String;
  multiple = [];
  show: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private menuService: MenuService,
              private categoriesService: CategoriesService,
              private articleService: ArticlesService,
              private pubsubService: PubSubService) {}


  ngOnInit() {
   this.getCategories();
   this.getImagesArticles();
  }

  getCategories(){
    this.categoriesService.getCategories()
      .subscribe(result => this.categories = result);
  }

  getImagesArticles(){
    this.articleService.getImagesArticles()
      .subscribe(result => this.img = result);
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

  test(){
    if(this.show == false){
      this.show = true;
    }
    else {
      this.show = false;
    }
  }
}
