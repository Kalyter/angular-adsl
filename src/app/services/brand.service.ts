import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class BrandService {

  constructor(private _http: HttpClient,
              private authService: AuthService) {
  }

  getBrand() {
    const uri = '/api/brand/';
    return this
      ._http
      .get(uri)
      .map(res => {
        return res;
      });

  }

  addBrand(brand) {
    const uri = '/api/admin/brand/add';
    const obj = brand;
    this._http.post(uri, obj, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
    })
      .subscribe(res => console.log('Done'));
  }

  uploadBrand(brandimg, brand) {
    const uri = '/api/admin/brand/upload';
    const obj = brandimg;
    this._http.post(uri, obj, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
    })
      .subscribe(res => {
        console.log(res);
        let arr = Object.getOwnPropertyDescriptor(res, 'filename');
        let filen = arr.value;
        brand.img = filen;
        this.addBrand(brand);
        console.log(brand);
      });
  }

  editBrand(id) {
    const uri = '/api/admin/brand/edit/' + id;
    return this
      ._http
      .get(uri, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .map(res => {
        return res;
      });
  }

  updateBrand(obj, id) {
    const uri = '/api/admin/brand/update/' + id;

    this
      ._http
      .post(uri, obj, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .subscribe(res => console.log('Done'));
  }

  uploadEditBrand(brandimg, brand, id) {
    const uri = '/api/admin/brand/upload';
    const obj = brandimg;
    this._http.post(uri, obj, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
    })
      .subscribe(res => {
        console.log(res);
        let arr = Object.getOwnPropertyDescriptor(res, 'filename');
        let filen = arr.value;
        brand.img = filen;
        this.updateBrand(brand, id);
        console.log(brand);
      });
  }

  deleteBrand(id) {
    const uri = '/api/admin/brand/delete/' + id;

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
    const uri = '/api/admin/brand/uporder/';
    this
      ._http
      .put(uri, obj, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .subscribe(res => console.log('Done'));
  }

}
