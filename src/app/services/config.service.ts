import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthService} from "../auth/auth.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";


@Injectable()
export class ConfigService {
  private configsite = new BehaviorSubject<object>({});
  currentConfig = this.configsite.asObservable();

  constructor(private _http: HttpClient,
              private authService: AuthService) {
  }

  getConfig() {
    const uri = '/api/config/';
    return this
      ._http
      .get(uri)
      .map(res => {
        this.configsite.next(res);
        return res;
      });
  }

  updateConfig(obj) {
    const uri = '/api/admin/config/update';
    this._http.put(uri, obj, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
    })
      .subscribe(res => console.log('Done'));
  }



}
