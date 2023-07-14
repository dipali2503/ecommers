import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { NavigationEnd, Router } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoaderService } from './services/loader.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ecommerce';
  _router: string;
  showHeader=true;
  subTotal: number = 0;
  cartProduct: any[] = [];
  totalItems: number = 0;
  showLoader$ = this.loaderService.loadingAction$;
  isLogin = false;
  isLoginAdmin = false;
  constructor(private productService: ProductService ,private router: Router,private loaderService: LoaderService,private http:HttpClient,private changeDetectorRef: ChangeDetectorRef) {
    this._router = router.url;
    // this.productService.cartAddedTosubject.subscribe((res) => {
    // });
  }

  ngOnInit(): void {
    this.http.get('http://localhost:5000/user', {
      withCredentials:true
    }).subscribe((res:any) => {
      console.log('App Init');
      // console.log(res.cart.length);
      this.cartProduct = [];
      this.productService.totalItems.next(res.cart.length);
      // this.totalItems = res.cart.length;
      this.subTotal = 0;
      console.log(res.cart.length);
      res.cart.forEach((item: any) => {
        this.subTotal = this.subTotal + parseInt(item.price);
      })
      this.productService.totalItems.subscribe((res) => this.totalItems = res);
      this.productService.productCartList.next(res.cart);
      this.productService.productCartList.subscribe((res) => this.cartProduct.push(res));
      this.changeDetectorRef.detectChanges();
      console.log(this.cartProduct);
      if (res.name) {
        this.productService.isLogin.next(true);
      }
    },(err) => {
      this.productService.isLogin.next(false);
      console.log(err);
    })
    // this.productService.getCartProducts().subscribe(res => {
    //   // console.log(res);
    //   this.totalItems = res.length;
    //   this.subTotal = 0;
    //   this.productService.cartProducts.forEach(item => {
    //     // console.log(item);
    //     this.subTotal = this.subTotal + item.price;
    //   })
    //   this.cartProduct.push(res);
    // });
    this.productService.isLogin.subscribe((res) => {
      this.isLogin = res;
    });
    this.productService.isLoginAdmin.subscribe((res) => {
      this.isLoginAdmin = res;
    });
  }

  logout() {
    this.http.post('http://localhost:5000/logout', {}, {
      withCredentials:true
    }).subscribe(() => {
      this.productService.isLogin.next(false);
      this.productService.isLoginAdmin.next(false);
    })
  }

  redirectToSale(){
    this.router.navigateByUrl("page/sale");
  }
  redirectTo(){
    this.router.navigateByUrl("page/newHome");
  }

  // redirectToItem(){
  //   this.router.navigateByUrl("page/items");
  // }
  // redirectTo(){
  //   this.router.navigateByUrl("contactUs");
  // }

  // loadCart() {
  //   this.subTotal = 0;
  //   this.productService.getCartItemByCustomerId(1).subscribe((res: any) => {
  //     this.productService.cartProducts = res.data;
  //     this.productService.cartProducts.forEach(element =>{
  //       this.subTotal = this.subTotal+element.price;
  //     });
  //     debugger;
  //   });
  // }
}
