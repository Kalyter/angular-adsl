import { Component, OnInit, OnDestroy } from '@angular/core';
import {BrandService} from "../../services/brand.service";
import {PubSubService} from "../../services/pub-sub.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-brand-admin',
  templateUrl: './brand-admin.component.html',
  styleUrls: ['./brand-admin.component.css']
})
export class BrandAdminComponent implements OnInit {

  brand:any;
  subscription: Subscription;
  public popoverTitle: string = 'Confirmation';
  public popoverMessage: string = 'Are you sure you want to delete this brand ?';
  public cancelClicked: boolean = false;

  constructor(private brandService:BrandService, private pubsubService:PubSubService, private router:Router) { }

  ngOnInit() {

    //retrieve brands on init
    this.getBrands();

    //check if brand are updated and reload if yes
    this.subscription = this.pubsubService.on('brand-updated')
      .subscribe(() => setTimeout(() => {
        this.getBrands();
      }, 1000));

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  // retrieve brands function
  getBrands() {
    this.brandService.getBrand()
      .subscribe(result => this.brand = result);
  }

  // delete brand function
  deleteBrand(id: number) {

    this.brandService.deleteBrand(id).subscribe(res => {
      console.log('Deleted');
    });
    this.pubsubService.publish('brand-updated');
    // redirect to users view
    this.router.navigate(['admin/brand']);

  }


// order brands update
  orderBrands($i, $event) {

    $event.forEach((item, key) => {
      item.order = key + 1;
    });
    this.brandService.updateOrder($event);
    this.pubsubService.publish('brand-updated');
    // redirect to users view
    this.router.navigate(['admin/brand']);

  }

}
