import { Component, OnInit } from '@angular/core';
import {ArticlesService} from "../../services/articles.service";
import {fadeTransition} from "../animations/fade2.animation";


@Component({
  templateUrl: './view-articles.component.html',
  animations: [fadeTransition],
  host: {'[@fadeTransition]': ''}

})
export class ViewArticlesComponent implements OnInit {

  articles:any;

  constructor(private articlesService: ArticlesService) { }

  ngOnInit() {
    this.getArticles();
  }


  getArticles() {
    this.articlesService.getArticles()
      .subscribe(result => this.articles = result);
  }


}
