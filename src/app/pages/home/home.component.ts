import { HttpClient } from '@angular/common/http';
import { LoaderService } from './../../services/loader.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productList: any[] = [];
  filterProduct : any[]=[];
  param : string;
  subTotal: number = 0;
  tab: string;
  isLogin = false;
  carObj: any = {
    //object we need to send
    //properties
    CartId: 0,
    CustId: 1,
    ProductId: 0,
    Quantity: 0,
    AddedDate: '2023-04-27T07:12:40.926Z',
  };
  p: number =1 ;
  itemsPerPage: number = 3;
  totalProducts: any;
    constructor(private productService: ProductService, private router: Router, private loaderService: LoaderService , private query : ActivatedRoute, private http:HttpClient,private changeDetectorRef: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.loaderService.showLoader();
    // this.loadAllProducts();
    this.getProductDB();
    this.query.queryParams
      .subscribe(params => {
        // console.log('params', params['tag']);
        // this.param = params['tag'];
        if (params['tag']) {
          this.filterProduct = this.productList.filter(product => product.tag == params['tag']);
          this.tab = params['tag'];
        } else {
          this.tab = 'All';
          this.filterProduct.push(this.productList);
        }
        console.log('tab', this.tab);
      }
    );
  }


  loadAllProducts() {
    debugger;
    setTimeout(() => {
      this.productService.getAllProducts().subscribe((result: any) => {
        this.loaderService.hideLoader();
        let localData: any = localStorage.getItem('session');
        if(result[JSON.parse(localData).id-1].id == JSON.parse(localData).id){
          result[JSON.parse(localData).id-1].price = JSON.parse(localData).price
        }
        this.productList = result;
        this.filterProduct = result;
        this.totalProducts = result.length;
      });
    }, 0);
  }

  getProductDB() {
    this.http.get('http://localhost:5000/products', {
      withCredentials:true
    }).subscribe((res:any) => {
      this.loaderService.hideLoader();
      this.productList = res;
      this.filterProduct = res;
      this.totalProducts = res.length;
      // console.log(this.productList);
    })
  }

  filterCloth(){
    this.filterProduct = this.productList.filter(product => product.category == 'cloths');
  }

  filterjewelery(){
    this.filterProduct = this.productList.filter(product => product.category == 'jewelery');
    // Bag
    // cloths
    // jewelery
  }

  filterBags(){
    this.filterProduct = this.productList.filter(product => product.category == 'Bag');
  }

  filterLtoH() {
    this.filterProduct.sort((a:any, b:any) => {
      if (a.price < b.price) return -1;
      if (a.price > b.price) return 1;
      return 0;
     });
  }

  filterHtoL() {
   this.filterProduct.sort((a:any, b:any) => {
    if (a.price > b.price) return -1;
    if (a.price < b.price) return 1;
    return 0;
   });
  }

  navigateToAll(){
    this.router.navigate(
      ['/'],
    { queryParams: {} });
    this.filterProduct = this.productList;
  }

  navigateToBest(){
    this.router.navigate(
      ['/'],
    { queryParams: { tag: 'Best' } });
  }
  navigateToNew(){
    this.router.navigate(
      ['/'],
    { queryParams: { tag: 'New' } });
  }

  navigateToOffer(){
    this.router.navigate(
      ['/'],
    { queryParams: { tag: 'Offer' } });
  }
  redirectToItem(){
    this.router.navigate(
      ['page/items'],
    { queryParams: { order: 'popular' } });
  }

  getSelectedProduct(id: number) {
    this.router.navigate(
      ['page/items'],
    { queryParams: { id: id } });
    this.productService.getProduct(id).subscribe((result: any) => {
      this.productService.selectedProduct.next(result);
      console.log("productone",this.productService.productCartList)
      // console.log("producttwo",product)
      // console.log(this.productService.selectedProduct);
    });
  }

  // loadCart() {
  //   this.subTotal = 0;
  //   this.productService.getCartItemByCustomerId(1).subscribe((res: any) => {
  //     this.productService.cartProducts = res;
  //     this.productService.cartProducts.forEach(element =>{
  //       this.subTotal = this.subTotal+element.price;
  //     });
  //     debugger;
  //   });
  // }



  addItemToCart(product: any) {
    this.productService.isLogin.subscribe((res) => {
      this.isLogin = res;
      // console.log("productone",this.productService.productCartList)
      // console.log("producttwo",product)
      if (!res) {
        Swal.fire("Error", "Please Login", "error");
      } else {
        // this.productService.cartProducts.push(product);
        // alert("Product added to the cart")
        // this.productService.productCartList.next(this.productService.cartProducts);
        // this.productService.cartAddedTosubject.next(true);
        this.http.get('http://localhost:5000/user', {
          withCredentials:true
        }).subscribe((res:any) => {
          console.log(res._id);
          this.http.post('http://localhost:5000/addToCart', {
            cart: product,
            id: res._id
          }, {
            withCredentials:true,
          }).subscribe((res:any) => {
            this.productService.totalItems.next(res.length);
            this.productService.productCartList.next(res);
            console.log(this.productService.productCartList);
            // let  appComponent = new AppComponent(this.productService,this.router,this.loaderService,this.http,this.changeDetectorRef);
            // // appComponent.ngOnInit();
          })
        },(err) => {
          console.log(err);
        })
      }
    });
    // debugger;
    // this.carObj.ProductId = productId;
    };
  }

  // what ever we are adding its maintaing in this 2 list
