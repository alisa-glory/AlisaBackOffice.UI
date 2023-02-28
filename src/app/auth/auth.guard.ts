import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean{
    if(this.authService.isLoggedIn){
      // console.log("isLoggedIn:",true);
      return true;
    }
    else{
      this.router.navigate(['/login']);
      // console.log("isLoggedIn:",false);
      return false;
    }
    
  }
  
}
