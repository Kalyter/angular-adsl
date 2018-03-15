import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routing } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { Orderby } from './pipes/orderby';
import { MenuService } from '../services/menu.service';
import { ArticlesComponent } from './articles/articles.component';
import { MainComponent } from './main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { MenuAdminComponent } from './admin/menu-admin/menu-admin.component';
import {MenuAdminAddeditComponent} from "./admin/menu-admin/menu-admin-addedit.component";
import {PubSubService} from "../services/pub-sub.service";
import {BrandService} from "../services/brand.service";
import { BrandAdminComponent } from './admin/brand-admin/brand-admin.component';
import {BrandAdminAddeditComponent} from "./admin/brand-admin/brand-admin-addedit.component";
import {DndModule} from 'ng2-dnd';
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CategoriesAdminComponent } from './admin/categories-admin/categories-admin.component';
import { BarMenuComponent } from './admin/bar-menu/bar-menu.component';
import {CategoriesService} from "../services/categories.service";
import {CategoriesAdminAddeditComponent} from "./admin/categories-admin/categories-admin-addedit.component";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FilterItemPipe} from "./pipes/filter-item";
import {ArticlesService} from "../services/articles.service";
import {HoverContainerComponent} from "./animations/hover.component";
import {ViewArticlesComponent} from "./articles/view-articles.component";
import { ArticlesAdminComponent } from './admin/articles-admin/articles-admin.component';
import {ArticlesAdminAddComponent} from "./admin/articles-admin/articles-admin-add.component";
import {AngularDraggableModule} from "angular2-draggable";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    Orderby,
    ArticlesComponent,
    MainComponent,
    HomeAdminComponent,
    MenuAdminComponent,
    MenuAdminAddeditComponent,
    BrandAdminComponent,
    BrandAdminAddeditComponent,
    CategoriesAdminComponent,
    BarMenuComponent,
    CategoriesAdminAddeditComponent,
    FilterItemPipe,
    HoverContainerComponent,
    ViewArticlesComponent,
    ArticlesAdminComponent,
    ArticlesAdminAddComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    MatCheckboxModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularDraggableModule,
    DndModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [MenuService,PubSubService, BrandService, CategoriesService, ArticlesService],
  bootstrap: [AppComponent, MenuComponent]
})

export class AppModule { }
