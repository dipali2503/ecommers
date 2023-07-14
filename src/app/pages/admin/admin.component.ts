import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  isLoginAdmin = false;
  productList: any = [];
  userList: any = [];
  price: any;
  id: any;
  tag: any;

  constructor(
    // private formBuilder:FormBuilder,
    private http:HttpClient,
    private router:Router,
    private productService: ProductService,
  ){}

  ngOnInit(): void{
    this.http.get('http://localhost:5000/user', {
      withCredentials:true
    }).subscribe((res:any) => {
      console.log(res);
      if (res.name) {
        this.productService.isLoginAdmin.next(true);
      }
    },(err) => {
      this.productService.isLoginAdmin.next(false);
      console.log(err);
    });
    this.productService.isLoginAdmin.subscribe((res) => {
      this.isLoginAdmin = res;
      // if (!res) {
      //   this.router.navigateByUrl("page/admin/login");
      // }
    });
    this.getProductDB();
    this.getUserDB();
  }

  getProductDB() {
    this.http.get('http://localhost:5000/products', {
      withCredentials:true
    }).subscribe((res:any) => {
      this.productList = res;
      // console.log(this.productList);
    })
  }

  getUserDB() {
    this.http.get('http://localhost:5000/allUsers', {
      withCredentials:true
    }).subscribe((res:any) => {
      this.userList = res;
      // console.log(this.userList);
    })
  }

  getId(id: any) {
    console.log(id);
    this.id = id;
  }

  changePrice(price: number) {
    console.log(price);
    if (price > 0) {
      this.http.post('http://localhost:5000/update_price', {
        price: price,
        id: this.id,
      }, {
      withCredentials:true
    }).subscribe((res:any) => {
      // console.log(res);
      this.getProductDB();
    })
    }
  }

  changeTag(tag: string) {
    console.log(tag);
    if (tag !== "") {
      this.http.post('http://localhost:5000/update_tag', {
        tag: tag,
        id: this.id,
      }, {
      withCredentials:true
    }).subscribe((res:any) => {
      // console.log(res);
      this.getProductDB();
    })
    }
  }

  changeStatus(status: string, id: any) {
    let state = 'active';
    if (status === 'active'){
        state = 'inactive';
    } else {
      state = 'active';
    }
    this.http.post('http://localhost:5000/update_status', {
        status: state,
        id: id,
      }, {
      withCredentials:true
    }).subscribe((res:any) => {
      // console.log(res);
      this.getUserDB();
    })
  }

  navigateLogin() {
    this.router.navigateByUrl("page/admin/login");
  }
}
