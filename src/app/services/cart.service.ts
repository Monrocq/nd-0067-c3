import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart: Map<Product, number> = new Map();

  constructor() {
    this.cart$.subscribe(products => this.cart = products);
  }

  private cartSource = new Subject<Map<Product, number>>();
  cart$ = this.cartSource.asObservable();

  public addToCart(product: Product, quantity: number) {
    this.setItem(product, quantity)
    alert("Product added!")
  }

  setItem(product: Product, quantity: number) {
    let cartUpdated: Map<Product, number> = this.cart;
    cartUpdated.set(product, quantity);
    this.cartSource.next(cartUpdated);
  }

  deleteItem(product: Product) {
    let cartUpdated: Map<Product, number> = this.cart;
    cartUpdated.delete(product);
    this.cartSource.next(cartUpdated);
  }
}
