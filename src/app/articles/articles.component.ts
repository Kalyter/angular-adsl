import { Component, OnInit } from '@angular/core';
import {ArticlesService} from "../../services/articles.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriesService} from "../../services/categories.service";

@Component({
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']

})
export class ArticlesComponent implements OnInit {

  articles:any;
  categories:any;
  menu:any;

  constructor(private articlesService: ArticlesService,
              private route: ActivatedRoute,
              private categoriesService:CategoriesService) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if(this.route.snapshot.params['for'] == "cat")
    {
      this.getArticlesForCat(id);
    }
    else{
      this.getArticlesForMenu(id);
    }

  }


  getArticlesForCat(id) {
    this.articlesService.getArticlesCat(id)
      .subscribe(result => this.articles = result);
  }

  getArticlesForMenu(id) {
    this.categoriesService.getCategoriesMenu(id)
      .subscribe(result => {
        this.categories = result;

        this.articlesService.getArticlesMenu(this.categories)
          .subscribe(result => this.articles = result);

      });

  }



}
