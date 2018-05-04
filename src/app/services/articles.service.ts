import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class ArticlesService {

  constructor(private _http: HttpClient,
              private authService: AuthService) {
  }

  getArticles() {
    const uri = '/api/articles/';
    return this
      ._http
      .get(uri)
      .map(res => {
        return res;
      });

  }

  addArticle(articles) {
    const uri = '/api/admin/articles/add';
    const obj = articles;
    this._http.post(uri, obj, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
    })
      .subscribe(res => console.log('Done'));
  }

  editArticle(id) {
    const uri = '/api/admin/articles/edit/' + id;
    return this
      ._http
      .get(uri, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .map(res => {
        return res;
      });
  }

  viewArticle(id) {
    const uri = '/api/articles/view/' + id;
    return this
      ._http
      .get(uri)
      .map(res => {
        return res;
      });
  }


  updateArticle(obj, id) {
    const uri = '/api/admin/articles/update/' + id;
    this
      ._http
      .post(uri, obj, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .subscribe(res => console.log('Done'));
  }

  deleteArticle(id) {
    const uri = '/api/admin/articles/delete/' + id;
    return this
      ._http
      .get(uri, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .map(res => {
        return res;
      });
  }

  getImagesArticles() {
    const uri = '/api/files/';
    return this
      ._http
      .get(uri)
      .map(res => {
        return res;
      });

  }

  uploadImages(images) {
    const uri = '/api/admin/files/upload';
    const obj = images;
    return this._http.post(uri, obj, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
    })
      .toPromise()
      .catch(reason => {
        console.log(reason);
      });
  }

  getArticlesCat(id) {
    const uri = '/api/articles/findbycat/' + id;
    return this
      ._http
      .get(uri)
      .map(res => {
        return res;
      });
  }

  getArticlesBrand(id) {
    const uri = '/api/articles/findbybrand/' + id;
    return this
      ._http
      .get(uri)
      .map(res => {
        return res;
      });
  }

  getArticlesMenu(categories) {
    const uri = '/api/articles/findbymenu/';
    return this
      ._http
      .post(uri, categories)
      .map(res => {
        return res;
      });
  }

}
