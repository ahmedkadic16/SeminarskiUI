import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, FormControl, UntypedFormGroup, Validators} from "@angular/forms";
import ValidateForm from "../../helpers/validateforms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {NavbarService} from "../../services/navbar.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm!:UntypedFormGroup;

  constructor(private fb:UntypedFormBuilder,
              private authService:AuthService,
              private router:Router,
              private navbar: NavbarService) { }

  ngOnInit(): void {
    this.navbar.hide();
    this.signUpForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',Validators.required],
      dateofbirth:['',Validators.required],
      password:['',Validators.required],
    })
  }
  onSignup() {
    if(this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value)
        .subscribe( {
          next:(res=>{
              alert(res.message);
              this.signUpForm.reset();
              this.router.navigate(['login']);
          })
          ,error:(err=>{
            alert(err?.error.message);
          })
        })
      console.log(this.signUpForm.value);
    }
    else {
      ValidateForm.validateAllFormFields(this.signUpForm);
     //alert("Your form is invalid!");
    }
  }

}
