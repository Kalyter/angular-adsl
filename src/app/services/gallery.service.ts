import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {AuthService} from "../auth/auth.service";

@Injectable()
export class GalleryService {

  private messageSource = new BehaviorSubject<number>(0);
  currentMessage = this.messageSource.asObservable();

  constructor(private _http: HttpClient,
              private authService: AuthService) {
  }

  changeOrder(message: number) {
    this.messageSource.next(message)
  }

  getAlbums() {
    console.log(this.authService.accessToken);
    const uri = '/api/gallery/';
    return this
      ._http
      .get(uri)
      .map(res => {

        return res;
      });
  }

  updateOrder(obj) {
    const uri = '/api/admin/albums/uporder/';
    this
      ._http
      .put(uri, obj, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .subscribe(res => console.log('Done'));
  }

  updateAlbum(obj) {
    const uri = '/api/admin/albums/update/';
    this
      ._http
      .put(uri, obj, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .subscribe(res => console.log('Done'));
  }

  editAlbum(id) {
    const uri = '/api/admin/albums/edit/' + id;
    return this
      ._http
      .get(uri, {
        headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
      })
      .map(res => {
        return res;
      });
  }

}
