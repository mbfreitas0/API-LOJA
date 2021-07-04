import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'  

import { HeaderComponent } from './header/header.component';
import { ProductComponent } from './product/product.component';
import { LayoutComponent } from './layout/layout.component';
import { DetailsProdComponent } from './details-prod/details-prod.component';
import { EditProdComponent } from './edit-prod/edit-prod.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductComponent,
    LayoutComponent,
    DetailsProdComponent,
    EditProdComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],

  exports:[
    AppComponent,
    HeaderComponent,
    ProductComponent,
    LayoutComponent,
    DetailsProdComponent
  ],
    
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
