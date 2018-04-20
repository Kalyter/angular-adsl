import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class CategoriesService {
  private messageSource = new BehaviorSubject<number>(0);
  currentMessage = this.messageSource.asObservable();

  constructor(private _http: HttpClient,
              private authService: AuthService) {
  }

  getCategories() {
    const uri = '/api/categories/';
    return this
      ._http
      .get(uri)
      .map(res => {

        return res;
      });
  }

  addCategorie(cat) {
    const uri = '/api/categories/add';
    const obj = cat;
    this._http.post(uri, obj, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
    })
      .subscribe(res => console.log('Done'));
  }

  changeOrder(message: number) {
    this.messageSource.next(message)
  }

  editCategorie(id) {
    const uri = '/api/categories/edit/' + id;
    return this
      ._http
      .get(uri, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .map(res => {
        return res;
      });
  }

  getCategoriesMenu(id) {
    const uri = '/api/categories/getmenu/' + id;
    return this
      ._http
      .get(uri)
      .map(res => {
        return res;
      });
  }

  updateCategorie(obj, id) {
    const uri = '/api/categories/update/' + id;

    this
      ._http
      .post(uri, obj, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .subscribe(res => console.log('Done'));
  }

  deleteCategorie(id) {
    const uri = '/api/categories/delete/' + id;

    return this
      ._http
      .get(uri, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .map(res => {
        return res;
      });
  }

  updateOrder(obj) {
    const uri = '/api/categories/uporder/';
    this
      ._http
      .put(uri, obj, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .subscribe(res => console.log('Done'));
  }

}
