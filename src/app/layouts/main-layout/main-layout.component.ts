import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { AccountService } from 'src/app/services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  public appUserName: string = '';
  public appUserRole: any;
  appTitle:string = environment.appTitle;
  
  constructor(private auth: AuthService,private account: AccountService) { }

  ngOnInit(): void {
    this.account.getAppUserName()
    .subscribe((response) => {
      let appUserNameFromToken = this.auth.getAppUserNameFromToken();
      this.appUserName = response || appUserNameFromToken;
      // console.log("main-layout","name response:",response,"FromToken:",appUserNameFromToken);
    });

    this.account.getAppUserRole()
    .subscribe((response) => {
      let appUserRoleFromToken = this.auth.getAppUserRoleFromToken();
      this.appUserRole = response || appUserRoleFromToken;
      // console.log("main-layout","role response:",response,"FromToken:",appUserRoleFromToken);
    });    
  }

  isAuthorized(allowedRoles: any){
    return this.auth.isRolesAuthorized(allowedRoles, this.appUserRole);
  }

  logout(){
    this.auth.signOut();
  }
}
