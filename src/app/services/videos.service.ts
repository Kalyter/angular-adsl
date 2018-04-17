import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class VideosService {

  constructor(private _http: HttpClient) {
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


}
