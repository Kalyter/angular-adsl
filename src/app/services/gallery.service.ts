import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {AuthService} from "../auth/auth.service";

@Injectable()
export class GalleryService {

  constructor(private _http: HttpClient,
              private authService: AuthService) {
  }

  getAlbums() {
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

  addAlbum(obj) {
    const uri = '/api/admin/albums/add';
    this._http.post(uri, obj, {
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

  deleteAlbum(id) {
    const uri = '/api/admin/albums/delete/' + id;

    return this
      ._http
      .get(uri, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .map(res => {
        return res;
      });
  }

  updatePicture(obj) {
    const uri = '/api/admin/pictures/update/';
    this
      ._http
      .put(uri, obj, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .subscribe(res => console.log('Done'));
  }

  uploadImages(id, obj) {
    const uri = '/api/admin/pictures/upload/' + id;
    return this._http.post(uri, obj, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
    })
      .toPromise()
      .catch(reason => {
        console.log(reason);
      });
  }

  deletePicture(id) {
    const uri = '/api/admin/pictures/delete/' + id;

    return this
      ._http
      .get(uri, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .map(res => {
        return res;
      });
  }

  viewPicture(id) {
    const uri = '/api/gallery/view/' + id;
    return this
      ._http
      .get(uri)
      .map(res => {
        return res;
      });
  }

}
