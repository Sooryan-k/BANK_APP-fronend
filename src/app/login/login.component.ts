import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginErrorMsg:string=''
  loginSpinner:boolean=false

  constructor(private loginFb:FormBuilder,private api:ApiService,private loginRouter:Router){

  }

  loginForm=this.loginFb.group({//formgroup
  //formarray
    acno:['',[Validators.required,Validators.pattern('[0-9 ]*')]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]]
})
//formcontrol passes to the register.html
  login(){

    if(this.loginForm.valid){
    console.log(this.loginForm);//console-formgroup
    let acno=this.loginForm.value.acno
    let password=this.loginForm.value.password
    // console.log(acno,password);
    
    // alert('Login Clicked')

    this.api.login(acno,password).subscribe((result:any)=>{
      //store currentUser in local storage
      localStorage.setItem('currentUser',result.currentUser)
      //set token in localstorage
      localStorage.setItem('token',result.token)
      //store acno in localstorage
      localStorage.setItem('currentAcno',result.currentAcno)

      this.loginSpinner=true
      setTimeout(()=>{
        //redirected to dashboard
      this.loginRouter.navigateByUrl('/dashboard')

      },1000)

    },
    //response 401
    (result:any)=>{
      //error message 
      this.loginErrorMsg=result.error.message
      //setTimeout
      setTimeout(()=>{
        this.loginForm.reset()
        this.loginErrorMsg=''
      },2000)
    }
    )
    
  }
  else{
    alert('Invalid Form')
  }
}
}
