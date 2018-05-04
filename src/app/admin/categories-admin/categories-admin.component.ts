import {Component, OnInit, OnDestroy} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {PubSubService} from "../../services/pub-sub.service";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
import {MenuService} from "../../services/menu.service";

@Component({
  selector: 'app-categories-admin',
  templateUrl: './categories-admin.component.html',
  styleUrls: ['./categories-admin.component.scss']
})
export class CategoriesAdminComponent implements OnInit, OnDestroy {
  categories:any;
  public popoverTitle: string = 'Confirmation';
  public popoverMessage: string = 'Are you sure you want to delete this categories ?';
  public cancelClicked: boolean = false;
  data: number;
  menu: any;
  req: any;
  subscription: Subscription;
  myVar: number = 0;
  constructor(private categoriesService:CategoriesService,
              private pubsubService:PubSubService,
              private menuService:MenuService,
              private router:Router) { }

  ngOnInit() {
    this.menuService.getMenuandCat()
      .subscribe( result => {
        this.menu = result;
      });
    this.categoriesService.getSousCategories()
      .subscribe(result => this.categories = result);

    // update cat when updated
    this.subscription = this.pubsubService.on('cat-updated')
      .subscribe(() => setTimeout(() => {
        this.getCategories();
      }, 1000));

  }

  Plus(reset){
    if(reset === 0) {
      this.myVar = 0;
    }
    else {
      this.myVar = this.myVar+1;
    }
    return true;

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
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

  // order categories update
  orderCategories($i, $event) {
    console.log($event);
    $event.forEach((item, key) => {
      item.order = key + 1;
    });

    this.categoriesService.updateOrder($event);
    this.pubsubService.publish('cat-updated');
    // redirect to users view
    this.router.navigate(['admin/categories']);
  }


}

