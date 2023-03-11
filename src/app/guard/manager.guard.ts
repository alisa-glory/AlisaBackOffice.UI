import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {
  public appUserRole: any;

  constructor(
    private auth: AuthService, 
    private account: AccountService,
    private router: Router) {}  
  
  canActivate(): boolean {

      if(this.auth.isLoggedIn){
        this.account.getAppUserRole()
        .subscribe((response) => {
          let appUserRoleFromToken = this.auth.getAppUserRoleFromToken();
          this.appUserRole = response || appUserRoleFromToken;
          console.log("main-layout","role response:",response,"FromToken:",appUserRoleFromToken);
        });    

        let isAllowed = this.auth.isRolesAuthorized(["Admin", "Manager"],this.appUserRole);

        console.log("isLoggedIn:",true,"isAllowed:",isAllowed);        
        if(!isAllowed){
          this.router.navigate(['/unauthorize']);          
          console.log("Your role not allowed!");
          return false;
        }
        return true;
      }
      else{
        this.router.navigate(['/login']);
        console.log("isLoggedIn:",false);
        return false;
      }
  }
  
}
