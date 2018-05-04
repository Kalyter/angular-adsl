import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticlesService} from "../services/articles.service";
import {ActivatedRoute} from "@angular/router";
import {CategoriesService} from "../services/categories.service";
import { ChangeDetectorRef } from "@angular/core";
import {trigger, animate, transition, style, state} from '@angular/animations';
import {Title} from "@angular/platform-browser";
import {ConfigService} from "../services/config.service";

@Component({
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  animations: [
    trigger('boxAnimation', [
      state('*', style({opacity:1})),
      transition('inactive => active', [
        style({opacity:0}), animate('1.2s ease-in',
          style({
            opacity: 1.0,
          })),
      ]),
      transition('active => inactive', [
        style({opacity:1}), animate('1.2s ease-out',
          style({
            opacity: 0.0,
          })),
      ])
      ]
    )
  ]
})
export class ArticlesComponent implements OnInit, OnDestroy {
  articles:any;
  categories:any;
  cats:any;
  menu:any;
  id:number;
  param:any;
  private sub:any;
  private changeDetectorRef: ChangeDetectorRef;
  public boxState: string;
  runChangeDetection: boolean = false;
  config:any = {
    title: String
  };

  constructor(private articlesService: ArticlesService,
              private route: ActivatedRoute,
              private categoriesService:CategoriesService,
              private configService:ConfigService,
              private titleService: Title,
              changeDetectorRef: ChangeDetectorRef) {
    this.boxState = "active";
    this.changeDetectorRef = changeDetectorRef;
  }

  ngOnInit() {
    this.onLoad();

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.param = params['for'];
      this.runChangeDetection = true;
      this.initialiseState();
      this.configService.currentConfig.subscribe(message => {
        this.config = message;
        this.titleService.setTitle(this.config.title+" - Articles");
      });

    });
  }

  thereIsUnder(idmenu: number, req2: any) {
    if(!req2) return [];
    if(!idmenu) return req2;

    var req3 = req2.map(i => i.cat_id);
    let req4 = req3.filter(function(element){return (element==idmenu)});
    return req4.length !== 0;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  initialiseState(){
    if ( this.runChangeDetection ) {
      console.log( "Running change-detection." );
      this.boxState = "inactive";
      this.changeDetectorRef.detectChanges();

      setTimeout(
        () => {
          this.boxState = "active";
          console.log(this.boxState+" test");
          let idvar = this.route.snapshot.params['id'];

          if(this.route.snapshot.params['for'] === "cat")
          {
            this.getArticlesForCat(idvar);
          }
          else if(this.route.snapshot.params['for'] === "brand"){
            this.getArticlesForBrand(idvar);
          }
          else{
            this.getArticlesForMenu(idvar);
          }

        },
        ( 1000 )
      );

    }

  }

  onLoad(){
    this.categoriesService.getCategories().subscribe( result => {this.cats = result;})
    let idvar = this.route.snapshot.params['id'];
    if(this.route.snapshot.params['for'] === "cat")
    {
      this.getArticlesForCat(idvar);
    }
    else if(this.route.snapshot.params['for'] === "brand"){
      this.getArticlesForBrand(idvar);
    }
    else{
      this.getArticlesForMenu(idvar);
    }

  }

  getArticlesForCat(id) {
    this.categoriesService.getCategories()
      .subscribe(result => this.categories = result);

    this.articlesService.getArticlesCat(id)
      .subscribe(result => {
        this.articles = result;
      });
  }

  getArticlesForBrand(id) {
    this.categoriesService.getCategories()
      .subscribe(result => this.categories = result);

    this.articlesService.getArticlesBrand(id)
      .subscribe(result => {
        this.articles = result;
      });
  }

  getArticlesForMenu(id) {
    this.categoriesService.getCategoriesMenu(id)
      .subscribe(result => {
        this.categories = result;

        this.articlesService.getArticlesMenu(this.categories)
          .subscribe(result => {
            this.articles = result;
          });

      });

  }


}
