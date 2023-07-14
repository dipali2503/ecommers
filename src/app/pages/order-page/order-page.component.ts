import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent {
  constructor(private router: Router){}
  redirectToHome() {
    this.router.navigateByUrl("");
  }
}
