import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form:FormGroup

  constructor(
    private formBuilder:FormBuilder,
    private http:HttpClient,
    private router:Router,
    private productService: ProductService,
  ){}

  ngOnInit(): void{
    this.form = this.formBuilder.group({
      name:"",
      email:"",
      password:""
    })
  }

  ValidateEmail(): void {

  }

  submit(): void {
    let user = this.form.getRawValue();
    if(user.name === "" || user.email === "" || user.password === "") {
      Swal.fire("Error", "Please enter all the fields", "error");
    }
    // else if(!this.ValidateEmail()) {
    //   Swal.fire("Error", "Please enter all the fields", "error");
    // }
    else {
      this.http.post("http://localhost:5000/register_user", user, {
        withCredentials:true
      }).subscribe(() => {
        this.router.navigate(['/']);
        this.productService.isLogin.next(true);
      }, (err) => {
        console.log(err);
        this.productService.isLogin.next(false);
        Swal.fire("Error", err.error.message, "error");
      });
      }
  }
}
