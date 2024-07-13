import { CurrencyPipe, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { VatAddedPipe } from '../../pipes/vat-added.pipe';
import { FormsModule } from '@angular/forms';
import { FilterPipePipe } from '../../pipes/filter-pipe.pipe';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor,NgIf,UpperCasePipe,VatAddedPipe,CurrencyPipe,FormsModule,FilterPipePipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})

export class ProductComponent implements OnInit{

  products:Product[] = [];
  dataLoaded = false;
  filtertext ="";

  constructor(private productService:ProductService, private activatedRoute:ActivatedRoute, private toastrService:ToastrService, private cartService:CartService) {}

  ngOnInit(): void {
   this.activatedRoute.params.subscribe(params=>{
    if(params["categoryId"]){
      this.getProductsByCategory(params["categoryId"])
    }else{
      this.getProducts()
    }
   })
  }

  getProducts(){
    this.productService.getProducts().subscribe(response=>{
      this.products = response.data
      this.dataLoaded = true;
    })
  }

  getProductsByCategory(categoryId:number){
    this.productService.getProductsByCategory(categoryId).subscribe(response=>{
      this.products = response.data
      this.dataLoaded = true;
    })
  }

  addToCart(product:Product){
    this.toastrService.success("Sepete eklendi", product.productName);
    this.cartService.addToCart(product);
   }


}
