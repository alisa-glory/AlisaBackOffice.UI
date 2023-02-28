import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { createPasswordStrengthValidator } from 'src/app/validators/password-strength.validator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {
  
  form = this.fb.group({
    email: ['',{
      validators: [Validators.required],
      updateOn: 'blur'
    }],
    password: ['', [Validators.required,Validators.minLength(8),
                    createPasswordStrengthValidator()]]
  });

  hide = true;
  appTitle:string = environment.appTitle;
  appVersion:string = environment.appVersion;
  errorMessage: any = null;

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private account: AccountService
    ) {}

  ngOnInit(): void {
  if(this.auth.isLoggedIn){
      this.auth.signOut();
      return;
    }    
  }

  get email(){
    return this.form.controls['email'];
  }

  get password(){
    return this.form.controls['password'];
  }

  onSubmit(){
    
    if(this.form.valid){
      let user: User = {
        username: `${this.email.value}`,
        password: `${this.password.value}`
      };

      console.log("User",user)

      this.auth.singIn(user).subscribe({
        next: (res) =>{
          // console.log("login res",res);
          this.form.reset();
          this.auth.storeToken(res.token);
          const tokenPayload = this.auth.decodeToken();
          this.account.setAppUserName(tokenPayload.unique_name);
          this.account.setAppUserRole(tokenPayload.role);
          this.router.navigate(['']);
          // console.log("formSubmit","tokenPayload:",tokenPayload);
        },
        error: (err) =>{
          console.log(err.status,err.message);
          
          if(err.status == 401){
            this.errorMessage = "Wrong username or password!";
          }else{
            this.errorMessage = err.message
          }

        }
      });
    }else{
      console.log("login-form Invalid!");
    }
  }
}
