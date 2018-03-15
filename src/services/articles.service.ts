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

  getImagesArticles() {
    const uri = '/api/files/';
    return this
      ._http
      .get(uri)
      .map(res => {
        return res;
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
