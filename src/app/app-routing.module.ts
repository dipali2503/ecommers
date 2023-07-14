import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewHomeComponent } from './pages/new-home/new-home.component';
import { ErrorComponent } from './Error/error/error.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { KnowUsComponent } from './pages/know-us/know-us.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { HomeComponent } from './pages/home/home.component';
import { SaleComponent } from './pages/sale/sale.component';
import { ProductsComponent } from './pages/products/products.component';


//this is routing of pages path is url and component is pages

const routes: Routes = [
  {
    path:"page", loadChildren:()=>import('./pages/page/page.module')
    .then(mod=>mod.PageModule)
  },
  {
    path:'' , pathMatch:'full',
    component: HomeComponent,
  },
  {
    path:'**',
    component:ErrorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
