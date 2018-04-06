import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ArticlesService {

  constructor(private _http: HttpClient) {
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
    const uri = '/api/articles/add';
    const obj = articles;
    this._http.post(uri, obj)
      .subscribe(res => console.log('Done'));
  }

  editArticle(id) {
    const uri = '/api/articles/edit/' + id;
    return this
      ._http
      .get(uri)
      .map(res => {
        return res;
      });
  }

  updateArticle(obj, id) {
    const uri = '/api/articles/update/' + id;
    this
      ._http
      .post(uri, obj)
      .subscribe(res => console.log('Done'));
  }

  deleteArticle(id) {
    const uri = '/api/articles/delete/' + id;
    return this
      ._http
      .get(uri)
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
    const uri = '/api/files/upload';
    const obj = images;
    return this._http.post(uri, obj)
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
