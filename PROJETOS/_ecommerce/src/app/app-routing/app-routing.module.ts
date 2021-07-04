import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { HeaderComponent } from '../header/header.component';
import { ProductComponent } from '../product/product.component';
import { DetailsProdComponent } from '../details-prod/details-prod.component';

const routes: Routes = [
  /* {path:'', redirectTo:'header', pathMatch:'full'},
  {path:'', component: LayoutComponent, children: [
  {path: 'header', component: HeaderComponent },
  {path: 'product',component: ProductComponent}, */
  { path:'header' , component: HeaderComponent  },
  { path:'product', component: ProductComponent },
  { path:'details-prod', component: DetailsProdComponent },
  { path:' ', component: HeaderComponent  }

];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
