import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleComponent } from '../sale/sale.component';
import { ProductsComponent } from '../products/products.component';
import { NewHomeComponent } from '../new-home/new-home.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { KnowUsComponent } from '../know-us/know-us.component';
import { OrderPageComponent } from '../order-page/order-page.component';
import { ItemsComponent } from '../items/items.component';
import { AdminComponent } from '../admin/admin.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';

const routes: Routes = [
  {
    path: 'sale',
    component: SaleComponent,
  },
  {
    path: 'products',
    component:ProductsComponent,
  },
  {
    path: 'newHome',
    component:NewHomeComponent,
  },
  {
    path: 'contactUs',
    component:ContactUsComponent,
  },

  {
    path: 'knowUs',
    component:KnowUsComponent,
  },
  {
    path: 'items',
    component:ItemsComponent,
  },
  {
    path: 'order',
    component: OrderPageComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path:'login',
    component:LoginComponent,
  },
  {
    path:'register',
    component:RegisterComponent,
  },
  {
    path:'admin/login',
    component:AdminLoginComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
