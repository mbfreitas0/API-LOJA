import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-details-prod',
  templateUrl: './details-prod.component.html',
  styleUrls: ['./details-prod.component.css']
})
export class DetailsProdComponent implements OnInit {

  

  constructor( private productService: ProductsService) {}
  
  ngOnInit(){}
}
    