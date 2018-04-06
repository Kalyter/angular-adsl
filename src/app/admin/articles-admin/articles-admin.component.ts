import { Component, OnInit, OnDestroy } from '@angular/core';
import {ArticlesService} from "../../../services/articles.service";
import {CategoriesService} from "../../../services/categories.service";
import {BrandService} from "../../../services/brand.service";
import {PubSubService} from "../../../services/pub-sub.service";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";

@Component({
  selector: 'app-articles-admin',
  templateUrl: './articles-admin.component.html',
  styleUrls: ['./articles-admin.component.scss']
})
export class ArticlesAdminComponent implements OnInit {
  articles: any;
  categories: any;
  brands: any;
  subscription: Subscription;
  public popoverTitle: string = 'Confirmation';
  public popoverMessage: string = 'Are you sure you want to delete this article ?';
  public cancelClicked: boolean = false;

  constructor(private articlesService: ArticlesService,
              private categoriesService: CategoriesService,
              private brandService: BrandService,
              private router: Router,
              private pubsubService: PubSubService) {
  }

  ngOnInit() {
    this.getArticles();
    this.getCategories();
    this.getBrands();
    this.loadScript();

    // update art when updated
    this.subscription = this.pubsubService.on('articles-updated')
      .subscribe(() => setTimeout(() => {
        this.getArticles();
      }, 1000));

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  loadScript() {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.innerHTML = '';
    script.src = 'https://cdn.ckeditor.com/4.5.11/full/ckeditor.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }

  getCategories(){
    this.categoriesService.getCategories()
      .subscribe(result => this.categories = result);
  }

  getBrands(){
    this.brandService.getBrand()
      .subscribe(result => this.brands = result);
  }

  getArticles() {
    this.articlesService.getArticles()
      .subscribe(result => this.articles = result);
  }

  // delete cat function
  deleteArticle(id: number) {

    this.articlesService.deleteArticle(id).subscribe(res => {
      console.log('Deleted');
    });
    this.pubsubService.publish('articles-updated');
    // redirect to users view
    this.router.navigate(['admin/articles']);

  }

  thereIsUnder(idmenu: number, req2: any) {
    if(!req2) return [];
    if(!idmenu) return req2;

    let req3 = req2.map(i => i.cat_id);
    let req4 = req3.filter(function(element){return (element==idmenu)});
    return req4.length !== 0;
  }


}
