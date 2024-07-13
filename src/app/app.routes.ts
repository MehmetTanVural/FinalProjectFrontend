import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {path:"",pathMatch:"full", component:ProductComponent},
    {path:"products", component:ProductComponent},
    {path: "products/category/:categoryId", component:ProductComponent},
    {path:"products/add", component:ProductAddComponent},
    {path:"login", component:LoginComponent}
    
];
