import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { MainComponent } from './main/main.component';
import {HomeAdminComponent} from "./admin/home-admin/home-admin.component";
import {MenuAdminComponent} from "./admin/menu-admin/menu-admin.component";
import {MenuAdminAddeditComponent} from "./admin/menu-admin/menu-admin-addedit.component";
import {BrandAdminComponent} from "./admin/brand-admin/brand-admin.component";
import {BrandAdminAddeditComponent} from "./admin/brand-admin/brand-admin-addedit.component";
import {CategoriesAdminComponent} from "./admin/categories-admin/categories-admin.component";
import {CategoriesAdminAddeditComponent} from "./admin/categories-admin/categories-admin-addedit.component";
import {ViewArticlesComponent} from "./articles/view-articles.component";
import {ArticlesAdminComponent} from "./admin/articles-admin/articles-admin.component";
import {ArticlesAdminAddComponent} from "./admin/articles-admin/articles-admin-add.component";
import { AuthGuard } from './auth/auth.guard';
import {CallbackComponent} from "./callback.component";
import {VideosComponent} from "./videos/videos.component";
import {ViewVideosComponent} from "./videos/view-videos.component";
import {VideosAdminComponent} from "./admin/videos-admin/videos-admin.component";
import {VideosAdminAddComponent} from "./admin/videos-admin/videos-admin-add.component";
import {VideosAdminEditComponent} from "./admin/videos-admin/videos-admin-edit.component";
import {AlbumsAdminComponent} from "./admin/gallery-admin/albums-admin/albums-admin.component";
import {PicturesAdminComponent} from "./admin/gallery-admin/pictures-admin/pictures-admin.component";
import {GalleryComponent} from "./gallery/gallery.component";
import {GalleryViewComponent} from "./gallery/gallery-view.component";
import {MainAdminComponent} from "./admin/main-admin/main-admin.component";


// Route Configuration
export const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'admin/home', component: HomeAdminComponent, canActivate: [
    AuthGuard
  ], data: { animation: 'admin' }},
  { path: 'admin/main', component: MainAdminComponent, canActivate: [
    AuthGuard
  ], data: { animation: 'adminmain' }},
  {
    path: 'admin/brand',
    component: BrandAdminComponent, canActivate: [
    AuthGuard
  ],
    children: [
      { path: 'add', component: BrandAdminAddeditComponent,  data: { animation: 'addbrand' } },
      { path: 'edit/:id', component: BrandAdminAddeditComponent,  data: { animation: 'editbrand' } }
    ], data: { animation: 'adminbrand' }},
  {
    path: 'admin/categories',
    component: CategoriesAdminComponent, canActivate: [
    AuthGuard
  ],
    children: [
      { path: 'add', component: CategoriesAdminAddeditComponent,  data: { animation: 'addcat' } },
      { path: 'edit/:id', component: CategoriesAdminAddeditComponent,  data: { animation: 'editcat' } }
    ],  data: { animation: 'adminmenu' }
  },
  {
    path: 'admin/videos',
    component: VideosAdminComponent, canActivate: [
    AuthGuard
  ],
    children: [
      { path: 'add', component: VideosAdminAddComponent,  data: { animation: 'addvid' } },
      { path: 'edit/:id', component: VideosAdminEditComponent,  data: { animation: 'editvid' } }
    ],  data: { animation: 'adminvideos' }
  },
  {
    path: 'admin/articles',
    component: ArticlesAdminComponent, canActivate: [
    AuthGuard
  ],
    children: [
      { path: 'add', component: ArticlesAdminAddComponent,  data: { animation: 'addart' } },
      { path: 'edit/:id', component: ArticlesAdminAddComponent,  data: { animation: 'editart' } }
    ],  data: { animation: 'adminart' }
  },
  {
    path: 'admin/menu',
    component: MenuAdminComponent, canActivate: [
    AuthGuard
  ],
    children: [
      { path: 'add', component: MenuAdminAddeditComponent,  data: { animation: 'addmenu' } },
      { path: 'edit/:id', component: MenuAdminAddeditComponent,  data: { animation: 'editmenu' } }
    ],  data: { animation: 'adminmenu' }
  },
  { path: 'admin/gallery', component: AlbumsAdminComponent,  data: { animation: 'admingal' }},
  { path: 'admin/gallery/edit/:id', component: PicturesAdminComponent,  data: { animation: 'adminpic'}},
  { path: 'main', component: MainComponent,  data: { animation: 'main' }},
  { path: 'gallery', component: GalleryComponent,
    children: [
      { path: 'view/:id', component: GalleryViewComponent,  data: { animation: 'viewpic' } }
    ],  data: { animation: 'gallery' }},
  { path: 'videos', component: VideosComponent,
    children: [
      { path: 'view/:id', component: ViewVideosComponent,  data: { animation: 'viewvid' } }
    ],  data: { animation: 'videos' }},
  { path: 'articles/:for/:id', component: ArticlesComponent,
    children: [
    { path: 'view/:id', component: ViewArticlesComponent,  data: { animation: 'viewart' } }
  ],  data: { animation: 'articles' }
  },
  {
    path: 'callback',
    component: CallbackComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
