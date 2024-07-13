import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

 loginForm:FormGroup;
 constructor(private formBuilder:FormBuilder, private authService:AuthService, private toastrService:ToastrService){}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if (this.loginForm.valid) {
      let loginModel = Object.assign({},this.loginForm.value)

      this.authService.login(loginModel).subscribe(respone=>{
        this.toastrService.info(respone.message)
        localStorage.setItem("token",respone.data.token)
      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
  }

}
