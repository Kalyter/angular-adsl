import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class BrandService {

  constructor(private _http: HttpClient) { }

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
    const uri = '/api/brand/add';
    const obj = brand;
    this._http.post(uri, obj)
      .subscribe(res => console.log('Done'));
  }

  uploadBrand(brandimg, brand) {
    const uri = '/api/brand/upload';
    const obj = brandimg;
    this._http.post(uri, obj)
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
    const uri = '/api/brand/edit/' + id;
    return this
      ._http
      .get(uri)
      .map(res => {
        return res;
      });
  }

  updateBrand(obj, id) {
    const uri = '/api/brand/update/' + id;

    this
      ._http
      .post(uri, obj)
      .subscribe(res => console.log('Done'));
  }

  uploadEditBrand(brandimg, brand, id) {
    const uri = '/api/brand/upload';
    const obj = brandimg;
    this._http.post(uri, obj)
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
    const uri = '/api/brand/delete/' + id;

    return this
      ._http
      .get(uri)
      .map(res => {
        return res;
      });
  }

  updateOrder(obj) {
    const uri = '/api/brand/uporder/';
    this
      ._http
      .put(uri, obj)
      .subscribe(res => console.log('Done'));
  }

}
