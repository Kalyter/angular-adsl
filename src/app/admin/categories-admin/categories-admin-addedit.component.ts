import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {MenuService} from "../../services/menu.service";
import {routerTransition} from "../../animations/slide.animation";
import {PubSubService} from "../../services/pub-sub.service";
import {CategoriesService} from "../../services/categories.service";
import {FormControl, FormGroup, Validators, NgForm} from "@angular/forms";


@Component({
  moduleId: module.id.toString(),
  templateUrl: 'categories-admin-addedit.component.html',
  animations: [routerTransition],
  host: {'[@routerTransition]': ''}
})

export class CategoriesAdminAddeditComponent implements OnInit {
  title = "Add Categories";
  categories: any = {
    title: String,
    menu_id: String,
    order: Number,
    under_menu: Boolean,
    cat_id: Number
  };
  listmenu: any;
  count: number = 0;
  message: number;
  statusCreateForm: FormGroup;
  editId:number;
  listcat: any;
  menu_select: any;
  show: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private menuService: MenuService,
              private categoriesService: CategoriesService,
              private pubsubService: PubSubService) {}


  ngOnInit() {
    // retrieve menu list for link with cat
    this.getMenus();

    // retrieve last order
    this.categoriesService.currentMessage.subscribe(message => this.message = message)

    // still last order check
    if(this.message){
      this.count = this.message;
    }

    // check if add or edit via id params
    this.editId = this.route.snapshot.params['id'];


    //Form controls & FormGroup
    this.categories.title  = new FormControl("", [
      Validators.required
    ]);
    this.categories.menu_id  = new FormControl("", [
      Validators.required
    ]);
    this.categories.under_menu  = new FormControl("", [
    ]);
    this.categories.cat_id  = new FormControl("", [
    ]);

    this.statusCreateForm = new FormGroup({
      'title':  this.categories.title,
      'menu_id': this.categories.menu_id,
      'under_menu': this.categories.under_menu,
      'cat_id': this.categories.cat_id
    });


    // If edit page, push content in field
    if (this.editId) {
      this.title = 'Edit Categories';
      this.categoriesService.editCategorie(this.editId)
        .subscribe(result => {
          this.categories = result;
          (<FormControl>this.statusCreateForm.controls['title'])
            .setValue(this.categories.title);
          (<FormControl>this.statusCreateForm.controls['menu_id'])
            .setValue(this.categories.menu_id);
          (<FormControl>this.statusCreateForm.controls['under_menu'])
            .setValue(this.categories.under_menu);
          (<FormControl>this.statusCreateForm.controls['cat_id'])
            .setValue(this.categories.cat_id);

          if(this.categories.cat_id !== null && this.categories.cat_id !== 'undefined')
          {
            this.getCategories();
          }

        });


    }

  }

  trackByFn(index, item) {
    return index;
  }

  getCategories(){

    this.show = !this.show;

    let e = (document.getElementById("menu_choose")) as HTMLSelectElement;
    let sel = e.selectedIndex;
    let opt = e.options[sel];

    this.menu_select = opt.value;
    console.log(this.menu_select);

      this.categoriesService.getCategories()
        .subscribe(result => this.listcat = result );
  }

  // add/edit categories function
  handleSubmit(statusNgForm:NgForm, statusCreateForm:FormGroup) {
      event.preventDefault();

      //If form is submitted
      if (statusNgForm.submitted) {

        //Get value in categories object
        this.categories = statusCreateForm.value;
        this.categories._id = this.editId;

          // check if new or edit
          if (!this.categories._id) {

            // defaut under_menu
            if (this.categories.under_menu == "") {
              this.categories.under_menu = false;
            }
            // new order
            let totalcount = this.count + 1;
            this.categories.order = totalcount;
            this.categoriesService.addCategorie(this.categories);
            console.log(this.categories);
          }
          else{
            this.categoriesService.updateCategorie(this.categories, this.categories._id);
          }

        // publish event for update
        this.pubsubService.publish('cat-updated');
        // redirect to users view
        this.router.navigate(['admin/categories']);

      }
  }

  // Retrive menu function
  getMenus() {
    this.menuService.getMenu()
      .subscribe(result => this.listmenu = result);
  }
}
