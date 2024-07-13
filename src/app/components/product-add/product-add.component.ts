import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent implements OnInit  {
  
  productAddForm : FormGroup;
  constructor(private formsBuilder:FormBuilder, private productService:ProductService, private toastrService:ToastrService) {}

 ngOnInit(): void {
   this.createProductAddForm();
 }

createProductAddForm(){
  this.productAddForm = this.formsBuilder.group({
    productName:["",Validators.required],
    unitPrice:["",Validators.required],
    unitsInStock:["",Validators.required],
    categoryId:["",Validators.required]
  })
}

 add(){
  if(this.productAddForm.valid)
    {
      let productModel = Object.assign({},this.productAddForm.value)
      this.productService.add(productModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
          }
        }        
      })
    }else{
       this.toastrService.error("Formunuz eksik","Dikkat")
    } 
 }
}
