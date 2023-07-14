import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { SaleComponent } from '../sale/sale.component';
import { NewHomeComponent } from '../new-home/new-home.component';
import { KnowUsComponent } from '../know-us/know-us.component';
import { ProductsComponent } from '../products/products.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';


@NgModule({
  declarations: [
    SaleComponent,
    NewHomeComponent,
    ContactUsComponent,
    ProductsComponent,
    KnowUsComponent,
  ],
  imports: [
    CommonModule,
    PageRoutingModule
  ]
})
export class PageModule { }
