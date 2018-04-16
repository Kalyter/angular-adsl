import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuService } from '../../services/menu.service'
import { HttpClient } from '@angular/common/http';
import {Subscription} from "rxjs/Subscription";
import {PubSubService} from "../../services/pub-sub.service";
import {CategoriesService} from "../../services/categories.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['../app.component.css'],
})
export class MenuComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  menu:any;
  categories:any;
  link:any;

  constructor(private menuService:MenuService,
              private pubsubService:PubSubService,
              private categoriesService:CategoriesService) {}

  ngOnInit() {
    this.getMenus();
    this.getCategories();

    this.subscription = this.pubsubService.on('menu-updated')
      .subscribe(() => setTimeout(() => {
        this.getMenus();
      }, 500));
  }

  getMenus() {
    this.menuService.getMenu()
      .subscribe(result => {
        this.menu = result;
      });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  thereIsUnder(idmenu: number, req2: any) {
    if (!req2) return [];
    if (!idmenu) return [];
    var req3 = req2.map(i => i.menu_id);
    let req4 = req3.filter(function(element){return (element==idmenu)});
    return req4.length !== 0;
  }

  getCategories() {
    this.categoriesService.getCategories()
      .subscribe(result => {
        this.categories = result;

        this.categories = this.categories.filter(element => {return element.under_menu == true});
      });
  }
}

