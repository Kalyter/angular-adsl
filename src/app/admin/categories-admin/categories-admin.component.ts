import { Component, OnInit, OnDestroy } from '@angular/core';
import {CategoriesService} from "../../../services/categories.service";
import {PubSubService} from "../../../services/pub-sub.service";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
import {MenuService} from "../../../services/menu.service";

@Component({
  selector: 'app-categories-admin',
  templateUrl: './categories-admin.component.html',
  styleUrls: ['./categories-admin.component.scss']
})
export class CategoriesAdminComponent implements OnInit {
  categories:any;
  public popoverTitle: string = 'Confirmation';
  public popoverMessage: string = 'Are you sure you want to delete this categories ?';
  public cancelClicked: boolean = false;
  data: number;
  menu: any;
  req: any;
  subscription: Subscription;

  constructor(private categoriesService:CategoriesService,
              private pubsubService:PubSubService,
              private menuService:MenuService,
              private router:Router) { }

  ngOnInit() {
    this.getCategories();
    // retrieve menu list for link with cat
    this.getMenus();

    // update cat when updated
    this.subscription = this.pubsubService.on('cat-updated')
      .subscribe(() => setTimeout(() => {
        this.getCategories();
      }, 1000));
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  // Retrive menu function
  getMenus() {
    this.menuService.getMenu()
      .subscribe(result => this.menu = result);
  }
  getCategories() {
    this.categoriesService.getCategories()
      .subscribe(result => {
        this.categories = result;
        setTimeout(() => {
          let arr = Object.keys( result ).map(function ( key ) { return result[key]; });
          this.data = Math.max.apply( Math, arr.map(function(o){return o.order;}) );
          this.categoriesService.changeOrder(this.data);
        }, 1000);
      });
  }

  // delete cat function
  deleteCategorie(id: number) {

    this.categoriesService.deleteCategorie(id).subscribe(res => {
      console.log('Deleted');
    });
    this.pubsubService.publish('cat-updated');
    // redirect to users view
    this.router.navigate(['admin/categories']);

  }

  thereIsUnder(idmenu: number, req2: any) {
    if(!req2) return [];
    if(!idmenu) return req2;

    var req3 = req2.map(i => i.menu_id);
    let req4 = req3.filter(function(element){return (element==idmenu)});
    return req4.length !== 0;
  }

  // order categories update
  orderCategories($i, $event) {

    $event.forEach((item, key) => {
      item.order = key + 1;
    });

    this.categoriesService.updateOrder($event);
    this.pubsubService.publish('cat-updated');
    // redirect to users view
    this.router.navigate(['admin/categories']);
  }
}
