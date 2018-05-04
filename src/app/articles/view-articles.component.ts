import { Component, OnInit } from '@angular/core';
import {ArticlesService} from "../services/articles.service";
import {fadeTransition} from "../animations/fade2.animation";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ConfigService} from "../services/config.service";


@Component({
  templateUrl: './view-articles.component.html',
  animations: [fadeTransition],
  host: {'[@fadeTransition]': ''}

})
export class ViewArticlesComponent implements OnInit {
  idart:any;
  article: any = {
    title: String,
    content: String,
    categorie_field: Array,
    brand_field: Array,
  };
  categorie: any = {
    title: String,
  };
  brand: any = {
    title: String,
  };
  slideIndex: number = 1;
  config:any = {
    title: String
  };

  constructor(private route: ActivatedRoute,
              private articlesService: ArticlesService,
              private configService:ConfigService,
              private titleService: Title) {
  }

  ngOnInit() {

    this.idart = this.route.snapshot.params['id'];


    this.articlesService.viewArticle(this.idart)
      .subscribe(result => {
        this.article = (Object.values(result)[0]);
        this.categorie = this.article.categorie_field.reduce(function(arr, row){
          return row;
        });
        this.brand = this.article.brand_field.reduce(function(arr, row){
          return row;
        });
        this.showDivs(this.slideIndex);
        this.configService.currentConfig.subscribe(message => {
          this.config = message;
          this.titleService.setTitle(this.config.title+" - Articles - " + this.article.title);
        });
      });
  }

  plusDivs(n) {
    this.showDivs(this.slideIndex += n);
  }

  showDivs(n) {
    let i;
    let x = document.getElementsByClassName("article_img");
    if (n > x.length) {this.slideIndex = 1}
    if (n < 1) {this.slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
      (x[i] as HTMLInputElement).style.display = "none";
    }
    (x[this.slideIndex-1] as HTMLInputElement).style.display = "block";
  }

}
