import { Component } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  name: string = '';
  address: string = '';
  ccn: string = '';
  total: number = 0;

  constructor(public cartService: CartService) {
    this._calculateTotal()
  }

  getAction() {
    return '/confirmation?name='+this.name
  }

  updateQuantity(product: Product, quantity: number) {
    this.cartService.setItem(product, quantity);
    this._calculateTotal()
  }

  removeProduct(product: Product) {
    this.cartService.deleteItem(product);
    this._calculateTotal()
  }

  _calculateTotal() {
    let total: number = 0;
    for (let [product, quantity] of this.cartService.cart) {
      total += product.price! * quantity;
    }
    this.total = total;
  }

}
