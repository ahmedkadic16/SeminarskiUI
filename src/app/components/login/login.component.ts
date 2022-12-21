import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, FormControl, UntypedFormGroup, Validators} from "@angular/forms";
import ValidateForm from "../../helpers/validateforms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {NavbarService} from "../../services/navbar.service";
import {UserStoreService} from "../../services/user-store.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type:string = "password";
  isText:boolean=false;
  eyeIcon:string ="fa-eye-slash";

  loginForm!:UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder,
              private authService:AuthService,
              private router: Router,
              private navbar:NavbarService,
              private auth:AuthService,
              private userStore:UserStoreService) { }

  ngOnInit(): void {
    this.navbar.hide();
    this.loginForm=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required],
    })

  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon="fa-eye": this.eyeIcon="fa-eye-slash";
    this.isText ? this.type="text" : this.type="password";
  }

  onLogin() {
    if(this.loginForm.valid) {
      this.navbar.show();
      this.authService.login(this.loginForm.value)
        .subscribe({
          next:(res)=>{
            //alert(res.message);
            this.loginForm.reset();
            this.auth.storeToken(res.token);
            const tokenPayload = this.auth.decodedToken();
            this.userStore.setFullNameForStore(tokenPayload.unique_name);
            this.userStore.setRoleForStore(tokenPayload.role);
            this.userStore.setEmailForStore(tokenPayload.email);
            this.auth.setEmailLoggedIn(this.loginForm.value.email);
            this.router.navigate(['homepage']);
          },
          error:(err)=>{
          alert(err.error.message)
          }
        })

      console.log(this.loginForm.value);
    }
    else {
      ValidateForm.validateAllFormFields(this.loginForm);
      //alert("Your form is invalid!");
    }
  }
}
