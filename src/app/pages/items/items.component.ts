import { LoaderService } from './../../services/loader.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  productList: any[] = [];
  price: any;
  isLogin = false;
  constructor(private productService: ProductService, private router: Router, private loaderService: LoaderService ,private query : ActivatedRoute){}

  ngOnInit(): void {
    debugger;
    this.loaderService.showLoader();
    this.getSelectedProduct();
  }

  getSelectedProduct() {
    // this.productService.getSelectedProductList().subscribe(res => {
    //   this.loaderService.hideLoader();
    //   this.productList.push(this.productService.selectedProduct);
    //   console.log(this.productList[0]._value);
    // });
    this.query.queryParams
    .subscribe(params => {
      // console.log('params', params['id']);
      this.productService.productList.subscribe((result :any)=>{
        if (result[params['id']-1].id == params['id']) {
          this.loaderService.hideLoader();
          this.productList.push(result[params['id']-1]);
          // console.log('result', this.productList);
        }
      });
    });
  }

  changePrice(price: number, id: number, product: any) {
    // console.log(price);
    if (price > 0) {
      this.productList[0].price = price;
      this.productService.productList.subscribe(res => {
        // console.log(res[id - 1]);
        if (res[id - 1].id == id) {
          res[id - 1].price = price;
        }
      })
      localStorage.setItem('session' , JSON.stringify(product));

      // console.log(this.productList[0]._value);
    }
  }

  addItemToCart(product: any) {
    this.productService.isLogin.subscribe((res) => {
      this.isLogin = res;
      if (!res) {
        Swal.fire("Error", "Please Login", "error");
      } else {
        this.productService.cartProducts.push(product);
        alert("Product added to the cart")
        this.productService.productCartList.next(this.productService.cartProducts);
        this.productService.cartAddedTosubject.next(true);
        console.log("productone",this.productService.productCartList)
        console.log(product)

      }
    })
    // debugger;
    // this.carObj.ProductId = productId;
  };
}
