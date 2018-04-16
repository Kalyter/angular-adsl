import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MenuService} from "../../services/menu.service";
import {routerTransition} from "../../animations/slide.animation";
import {PubSubService} from "../../services/pub-sub.service";


@Component({
  moduleId: module.id.toString(),
  templateUrl: 'menu-admin-addedit.component.html',
  animations: [routerTransition],
  host: {'[@routerTransition]': ''}
})

export class MenuAdminAddeditComponent implements OnInit {
  title = "Add Menu";
  menu: any = {};
  count: number = 0;
  message: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private menuService: MenuService,
              private pubsubService: PubSubService) {}


  ngOnInit() {

    // retrieve last order
    this.menuService.currentMessage.subscribe(message => this.message = message)

    // check if add or edit via id params
    let menuId = this.route.snapshot.params['id'];

    if (menuId) {
      this.title = 'Edit Menu';
      this.menuService.editMenu(menuId)
        .subscribe(result => this.menu = result);
    }

    // still last order check
     if(this.message){
       this.count = this.message;
     }

  }

  // add/edit menu
  saveMenu() {
    // check if new or edit
    if (!this.menu._id) {
      let countobj = this.count + 1;
      this.menu.order = countobj;
      this.menuService.addMenu(this.menu);
    }
    else {
      console.log(this.menu);
      this.menuService.updateMenu(this.menu, this.menu._id);
    }

    // publish event for update
    this.pubsubService.publish('menu-updated');

    // redirect to users view
    this.router.navigate(['admin/menu']);
  }

}
