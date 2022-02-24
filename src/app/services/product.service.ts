import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [];

  constructor(private http: HttpClient) {
    this.http.get<Product[]>("../assets/data.json").subscribe(res => {
      this.productsSource.next(res);
      this.products = res;
    });
  }

  private productsSource = new Subject<Product[]>();
  products$ = this.productsSource.asObservable();

}
