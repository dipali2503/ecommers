import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit{
  cartProduct : any[]=[];
  subTotal:number = 0;
  totalItems: number = 0;
  isLogin = false;
  Id: any;
  saleObj: any =  {
    "SaleId": 0,
    "CustId": 1,
    "SaleDate": new Date(),
    "TotalInvoiceAmount": 0,
    "Discount": 0,
    "PaymentNaration": "Patmm ",
    "DeliveryAddress1": "Plot nio 122",
    "DeliveryAddress2": "Ner ATM",
    "DeliveryCity": "Pune",
    "DeliveryPinCode": "440033",
    "DeliveryLandMark": "ATM"}
constructor(private productService: ProductService, private router: Router,private http:HttpClient,){

}
@ViewChild(AppComponent) appComponent: AppComponent


ngOnInit(): void {
  // this.loadCart();
  this.productService.isLogin.subscribe((res) => this.isLogin = res);
  this.http.get('http://localhost:5000/user', {
      withCredentials:true
    }).subscribe((res:any) => {
      this.cartProduct = [];
      // console.log(res.cart.length);
      this.productService.totalItems.next(res.cart.length);
      this.Id = res._id;
      // this.totalItems = res.cart.length;
      this.subTotal = 0;
      res.cart.forEach((item: any) => {
        this.subTotal = this.subTotal + parseInt(item.price);
      })
      this.cartProduct.push(res.cart);
      // console.log(this.cartProduct);
      if (res.name) {
        this.productService.isLogin.next(true);
      }
    },(err) => {
      this.productService.isLogin.next(false);
      // console.log(err);
    })
  // this.productService.getCartProducts().subscribe(res => {
  //   this.totalItems = res.length;
  //   this.subTotal = 0;
  //   this.productService.cartProducts.forEach(item => {
  //     this.subTotal = this.subTotal + item.price;
  //   })
  //   this.cartProduct.push(res);
  //   // console.log(this.cartProduct);
  // });
}
  // loadCart() {
  //   this.subTotal = 0;
  //   this.productService.getCartItemByCustomerId(1).subscribe((res: any) => {
  //     this.cartProducts = res.data;
  //     this.cartProducts.forEach(element =>{
  //       this.subTotal = this.subTotal+ element.productPrice;
  //     })
  //   });
  //   debugger;
  // }

  RemoveItem(id:number){
    // this.productService.removeCartItemById(id).subscribe((res: any) => {
    //   if(res.result){
    //     // this.loadCart();
    //     this.productService.cartAddedTosubject.next(true);
    //   }

    // })
    // this.cartProduct[0].map((a:any, index:any)=>{
    //   if (id === a.id){
    //     this.cartProduct.splice(index,1);
    //     this.subTotal = this.subTotal - a.price;
    //     this.productService.cartProducts.splice(index,1);
    //     this.productService.productCartList.next([]);
    //     // console.log(a.price);
    //   }
    // });
    this.http.post('http://localhost:5000/deleteCart', {
      id: this.Id,
      _id: id,
    }, {
      withCredentials:true,
    }).subscribe((res) => {
      // console.log(res)
      this.ngOnInit();
    })
  }
  // makeSalefirst(){
  //   this.saleObj.TotalInvoiceAmount =this.subTotal;
  //   this.productService.cartAddedTosubject.next(true);
  //   this.productService.makeSale(this.saleObj).subscribe((res: any) => {
  //     if(res.result){
  //       // this.loadCart();
  //       this.productService.cartAddedTosubject.next(true);
  //     }

  //   })
  // }
  redirectToOrder(){
    if (this.subTotal != 0) {
      this.productService.cartProducts = [];
      this.productService.productCartList.next([]);
      // console.log(this.productService.cartProducts);
      // console.log(this.productService.productCartList);
      this.router.navigateByUrl("page/order");
    }
  }
}

