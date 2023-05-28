import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user:string=''
  currentAcno:string=''
  isCollapse:boolean=true;
  balance:Number=0;
  fundTransferSuccessMsg:string=''
  fundTransferErrorMsg:string=''
  logoutStatus:boolean=false
  //delete account
  acno:any
  deleteConfirmStatus:boolean=false
  deleteSuccessMessage:string=''


  constructor(private fundTransfer:FormBuilder,private api:ApiService,private dashboardRouter:Router){}
  ngOnInit(): void {
    if(!localStorage.getItem('token')){
      alert('Please login')
      this.dashboardRouter.navigateByUrl('')
    }
    if(localStorage.getItem('currentUser')){
      this.user=localStorage.getItem('currentUser')||''
    }
    if(localStorage.getItem('currentAcno')){
      this.currentAcno=localStorage.getItem('currentAcno')||''
    }
  }
    transferForm=this.fundTransfer.group({
      acno:['',[Validators.required,Validators.pattern('[0-9 ]*')]],
      amount:['',[Validators.required,Validators.pattern('[0-9 ]*')]],
      password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]*')]]
    })
  
  collapse(){
    this.isCollapse=!this.isCollapse
  }
  getBalance(){
    //api call to get the balance
    this.api.getBalance(this.currentAcno).subscribe((result:any)=>{
      this.balance=result.balance;
    })
  }

  fundtransfer(){
    if(this.transferForm.valid){
      //get the details from the fund transfer form
      let creditAcno=this.transferForm.value.acno
      let password=this.transferForm.value.password
      let amount=this.transferForm.value.amount
      this.api.fundTransfer(creditAcno,password,amount).subscribe((result:any)=>{
        console.log(result);
        this.fundTransferSuccessMsg=result.message//successful message
        setTimeout(()=>{
          this.transferForm.reset()
          this.fundTransferSuccessMsg=''
        },2000)
        
      },
      (result:any)=>{
        console.log(result.error.message);
        this.fundTransferErrorMsg=result.error.message//error message
        setTimeout(()=>{
          this.transferForm.reset()
          this.fundTransferErrorMsg=''
        },1000)
      }
      )

    }
    else{
      alert("Please provide a valid data")
    }
    
  }

  resetForm(){
    this.transferForm.reset()

  }
  logout(){
    this.logoutStatus=true
    localStorage.clear()
    

    setTimeout(()=>{
      this.dashboardRouter.navigateByUrl('')
    },1000)
  }
  //delete user account
  deleteAccount(){
    //data to be shared with child
    this.acno=localStorage.getItem('currentAcno')
    this.deleteConfirmStatus=true
  }
  cancelDelete(){
    this.acno=""
    this.deleteConfirmStatus=false
  }
  deleteFromParent(){
    this.api.deleteUserAccount().subscribe((result:any)=>{
      this.deleteSuccessMessage=result.message
      localStorage.clear()
      
      setTimeout(()=>{
        this.dashboardRouter.navigateByUrl('')
      },1000)
    })
  }

}
