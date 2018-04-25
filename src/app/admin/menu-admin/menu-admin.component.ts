import {Component, OnInit, OnDestroy} from '@angular/core';
import {MenuService} from "../../services/menu.service";
import { Subscription } from 'rxjs/Subscription';
import {PubSubService} from "../../services/pub-sub.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit, OnDestroy {

  public popoverTitle: string = 'Confirmation';
  public popoverMessage: string = 'Are you sure you want to delete this menu ?';
  public cancelClicked: boolean = false;

  menu: any;
  subscription: Subscription;
  data: number;

  constructor(private menuService: MenuService,
              private pubsubService: PubSubService,
              private router: Router) {

  }

  ngOnInit() {
    // retrieve menus
    this.getMenus();

    // update menu when updated
    this.subscription = this.pubsubService.on('menu-updated')
      .subscribe(() => setTimeout(() => {
        this.getMenus();
      }, 1000));

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  // get menu function + get last order
  getMenus() {
    this.menuService.getMenu()
      .subscribe(result => {
        this.menu = result;
        setTimeout(() => {
        let arr = Object.keys( result ).map(function ( key ) { return result[key]; });
        this.data = Math.max.apply( Math, arr.map(function(o){return o.order;}) );
        this.menuService.changeOrder(this.data)
        }, 1000);
      });
  }

  // delete menu function
  deleteMenu(id: number) {

    this.menuService.deleteMenu(id).subscribe(res => {
      console.log('Deleted');
    });
    this.pubsubService.publish('menu-updated');
    // redirect to users view
    this.router.navigate(['admin/menu']);

  }

// order menu update
  OrderMenus($i, $event) {

    $event.forEach((item, key) => {
      item.order = key + 1;
    });
    this.menuService.updateOrder($event);
    this.pubsubService.publish('menu-updated');
    // redirect to users view
    this.router.navigate(['admin/menu']);
  }


}



