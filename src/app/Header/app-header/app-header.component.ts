import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {
  title = 'ecommerce';
  cartProducts: any[] = [];
  subTotal: any;
  constructor(private productService: ProductService ,private router: Router) {
    this.productService.cartAddedTosubject.subscribe((res) => {});
    debugger;
    // this.loadCart();
  }

  redirectToSale(){
    this.router.navigateByUrl("page/sale");
  }

  // loadCart() {
  //   this.productService.getCartItemByCustomerId(1).subscribe((res: any) => {
  //     this.cartProducts = res.data;
  //     this.cartProducts.forEach(element =>{
  //       this.subTotal = this.subTotal+element.productPrice;
  //     })
  //   });
  // }
}
