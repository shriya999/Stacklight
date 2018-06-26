import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { DataService } from '../data.service';
import {Http, Response, RequestOptions, Headers,URLSearchParams} from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css',
              '../../css/icon-style.css',
              '../../assets/css/bootstrap.min.css',
              '../../assets/css/styles.css']
})
export class LoginComponent implements OnInit {
  email : string ='';
  password : string ='';
  isError :boolean = false;
  errorMessage : string ='';
  userData : any;
  constructor(private router : Router,public dataService: DataService) {}
  ngOnInit() {
    this.userData = localStorage.getItem('user');
    this.userData = JSON.parse(this.userData);
    console.log('userData',this.userData != null)
    if(this.userData != null){
        this.router.navigate(['dashboard']);
    }
  }

  login(){
    var url ='http://10.157.251.27:3000/sle/account/login'
    var headers ={'Content-Type':'application/x-www-form-urlencoded'}
    if(this.email && this.password){
      var params ={"emailId":this.email,"password":this.password};

      this.dataService.doPOST(url,params,headers).subscribe(
          suc => {
              console.log('success',suc);
              localStorage.setItem('user',JSON.stringify(suc));
              this.router.navigate(['dashboard']);
          },
          err => {
              let response = JSON.parse(err._body)
              this.errorMessage = response["error"];
              this.isError = true;
              console.log("error",response["error"]);
          }
      );
    }else if(!this.email && !this.password){
      this.errorMessage = "EmailId,Password Missing";
      this.isError = true;
    }else if(!this.email){
      this.errorMessage = "EmailId Missing";
      this.isError = true;
    }else if(!this.password){
      this.errorMessage = "Password Missing";
      this.isError = true;
    }
  }
}
