import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthService} from "../auth/auth.service";


@Injectable()
export class VideosService {

  constructor(private _http: HttpClient,
              private authService: AuthService) {
  }

  getVideos() {
    const uri = '/api/videos/';
    return this
      ._http
      .get(uri)
      .map(res => {
        return res;
      });

  }

  viewVideo(id) {
    const uri = '/api/videos/view/' + id;
    return this
      ._http
      .get(uri)
      .map(res => {
        return res;
      });
  }

  addVideo(video) {
    console.log(this.authService.accessToken);
    const uri = '/api/admin/videos/add';
    const obj = video;
    this._http.post(uri, obj, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
    })
      .subscribe(res => console.log('Done'));
  }

  deleteVideo(id) {
    const uri = '/api/admin/videos/delete/' + id;
    return this
      ._http
      .get(uri, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .map(res => {
        return res;
      });
  }


  updateVideo(obj, id) {
    const uri = '/api/admin/videos/update/' + id;

    this
      ._http
      .post(uri, obj, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .subscribe(res => console.log('Done'));
  }


}
