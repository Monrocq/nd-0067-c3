import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
  stream?: Subscription;
  routeSub?: Subscription;
  productId: number = 0;
  product: Product = new Product;
  quantity: number = 0;

  constructor(private productService: ProductService, private route: ActivatedRoute, public cartService: CartService) { }

  ngOnInit(): void {
    this.stream = this.productService.products$.subscribe(products => {
      this.product = this.getProduct(products, this.productId)
    });
    this.routeSub = this.route.params.subscribe(params => {
      this.productId = parseInt(params['id']);
      this.product = this.getProduct(this.productService.products, this.productId) || new Product
    });
  }

  ngOnDestroy(): void {
    this.stream?.unsubscribe();
    this.routeSub?.unsubscribe();
  }

  getProduct(products: Product[], id: number): Product {
    return products.filter(product => product.id === id)[0];
  }

}
