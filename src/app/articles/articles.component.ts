import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {ArticlesService} from "../../services/articles.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriesService} from "../../services/categories.service";
import {fadeInAnimation} from "../animations/fade.animation";
import { ChangeDetectorRef } from "@angular/core";
import {trigger, group, query, animate, transition, style, animateChild, state} from '@angular/animations';

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
  menu:any;
  id:number;
  param:any;
  private sub:any;
  private changeDetectorRef: ChangeDetectorRef;
  public boxState: string;
  runChangeDetection: boolean = false;

  constructor(private articlesService: ArticlesService,
              private route: ActivatedRoute,
              private categoriesService:CategoriesService,
              private router: Router,
              changeDetectorRef: ChangeDetectorRef) {
    this.boxState = "active";
    console.log(this.boxState);
    this.changeDetectorRef = changeDetectorRef;
  }

  ngOnInit() {
    this.onLoad();

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.param = params['for'];
      this.runChangeDetection = true;
      this.initialiseState();


    });
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
          if(this.route.snapshot.params['for'] == "cat")
          {
            this.getArticlesForCat(idvar);
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

    let idvar = this.route.snapshot.params['id'];
    if(this.route.snapshot.params['for'] == "cat")
    {
      this.getArticlesForCat(idvar);
    }
    else{
      this.getArticlesForMenu(idvar);
    }

  }

  getArticlesForCat(id) {
    this.articlesService.getArticlesCat(id)
      .subscribe(result => {this.articles = result; });
  }

  getArticlesForMenu(id) {
    this.categoriesService.getCategoriesMenu(id)
      .subscribe(result => {
        this.categories = result;

        this.articlesService.getArticlesMenu(this.categories)
          .subscribe(result => {this.articles = result; });

      });

  }



}
