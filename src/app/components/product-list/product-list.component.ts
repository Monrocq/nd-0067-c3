import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  stream?: Subscription;
  products: Product[];
  constructor(private productService: ProductService) {
    this.products = productService.products;
  }

  ngOnInit(): void {
    this.stream = this.productService.products$.subscribe(products => this.products = products)
  }

  ngOnDestroy(): void {
    this.stream?.unsubscribe();
  }

}
