import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {AuthService} from "../auth/auth.service";

@Injectable()
export class MenuService {

  private messageSource = new BehaviorSubject<number>(0);
  currentMessage = this.messageSource.asObservable();

  constructor(private _http: HttpClient,
              private authService: AuthService) {
  }

  getMenu() {
    const uri = '/api/menu/';
    return this
      ._http
      .get(uri)
      .map(res => {

        return res;
      });
  }

  changeOrder(message: number) {
    this.messageSource.next(message)
  }

  editMenu(id) {
    const uri = '/api/menu/edit/' + id;
    return this
      ._http
      .get(uri, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .map(res => {
        return res;
      });
  }

  addMenu(menu) {
    const uri = '/api/menu/add';
    const obj = menu;
    this._http.post(uri, obj, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
    })
      .subscribe(res => console.log('Done'));
  }

  updateMenu(obj, id) {
    const uri = '/api/menu/update/' + id;

    this
      ._http
      .post(uri, obj, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .subscribe(res => console.log('Done'));
  }

  deleteMenu(id) {
    const uri = '/api/menu/delete/' + id;

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
    const uri = '/api/menu/uporder/';

    this
      ._http
      .put(uri, obj, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .subscribe(res => console.log('Done'));
  }


}
