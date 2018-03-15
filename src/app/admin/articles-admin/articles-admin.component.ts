import { Component, OnInit } from '@angular/core';
import {ArticlesService} from "../../../services/articles.service";
import {CategoriesService} from "../../../services/categories.service";

@Component({
  selector: 'app-articles-admin',
  templateUrl: './articles-admin.component.html',
  styleUrls: ['./articles-admin.component.scss']
})
export class ArticlesAdminComponent implements OnInit {
  articles:any;
  categories:any;

  constructor(private articlesService:ArticlesService,
              private categoriesService:CategoriesService) { }

  ngOnInit() {
    this.getArticles();
    this.getCategories();
  }

  getCategories(){
    this.categoriesService.getCategories()
      .subscribe(result => this.categories = result);
  }

  getArticles() {
    this.articlesService.getArticles()
      .subscribe(result => this.articles = result);
  }

  thereIsUnder(idmenu: number, req2: any) {
    var req3 = req2.map(i => i.cat_id);
    let req4 = req3.filter(function(element){return (element==idmenu)});
    return req4.length !== 0;
  }


}
