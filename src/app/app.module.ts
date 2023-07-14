import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SaleComponent } from './pages/sale/sale.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewHomeComponent } from './pages/new-home/new-home.component';
import { ErrorComponent } from './Error/error/error.component';
import { AppHeaderComponent } from './Header/app-header/app-header.component';
import { AppFooterComponent } from './Footer/app-footer/app-footer.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ProductsComponent } from './pages/products/products.component';
import { KnowUsComponent } from './pages/know-us/know-us.component';
import { ItemsComponent } from './pages/items/items.component';
import { LoaderComponent } from './loader/loader.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FilterPipe } from './services/Utils';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
// import {SimpleNgLoaderModule} from 'simple-ng-loader';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    AppHeaderComponent,
    AppFooterComponent,
    ItemsComponent,
    LoaderComponent,
    FilterPipe,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    AdminLoginComponent,
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
