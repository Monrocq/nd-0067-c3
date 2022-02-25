import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  name: string = '';
  address: string = '';
  ccn: string = '';
  total: number = 0;

  constructor(public cartService: CartService, private fb: FormBuilder) {
    this._calculateTotal();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      number: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],

    })
  }

  get f(){
    return this.form.controls;
  }

  getAction() {
    return '/confirmation?name='+this.name+'&total='+this.total.toFixed(2);
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
