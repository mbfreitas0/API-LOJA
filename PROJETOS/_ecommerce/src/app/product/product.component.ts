import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { ProductsService } from '../services/products.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  preserveWhitespaces:true

})
export class ProductComponent implements OnInit {
  
  product = {} as Product;
  products: Product[];
  

  constructor( private productsService: ProductsService ) {}
    

  ngOnInit() {

   this.getProducts();
            
  }
   // defini se um produto será criado ou atualizado
   saveProduct(form: NgForm) {
    if (this.product.id_produto !== undefined) {
      this.productsService.updateProduct(this.product).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.productsService.saveProduct(this.product).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os produtos
  getProducts() {
    this.productsService.getProduct().subscribe((product: Product[]) => {
      this.products = product;
    });
  }

  // deleta um carro
  deleteProduct(product: Product) {
    this.productsService.deleteProduct(product).subscribe(() => {
      this.getProducts();
    });
  }

  // copia o carro para ser editado.
  editProduct(product: Product) {
    this.product = { ...product };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getProducts();
    form.resetForm();
    this.product = {} as Product;
  }

}  
  