import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.backOfficeApiUrl;
  private userPayload: any;

  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodeToken();
  }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}/api/Account/register`, userObj);
  }

  singIn(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}/api/Account/login`, loginObj);
  }

  signOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    // console.log("signOut","isLoggedIn:",this.isLoggedIn);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getAppUserNameFromToken(){
    if(this.userPayload)
      return this.userPayload.unique_name;
  }

  getAppUserRoleFromToken(){
    if(this.userPayload)
      return this.userPayload.role;
  }

  isRolesAuthorized(allowedRoles: string | string[], 
                    userRoles: string | string[]){
    // console.log("***isRolesAuthorized***");
    let permissions: string[] = [];
    if(typeof allowedRoles == 'string'){
      permissions.push(allowedRoles);
    }else{
      permissions.push(...allowedRoles);
    }

    // console.log("userRoles",userRoles);
    let isAllowed = false;
    // console.log("allowedRoles",permissions);
    if(typeof userRoles === 'string'){
      // console.log("roles is string.");
      isAllowed = permissions.includes(userRoles);
    }else{
      // console.log("roles is array.");
      for (let i = 0; i < userRoles.length; i++) {
        let userRole: string = userRoles[i];
        // console.log("userRole",userRole);
          
        if(permissions.includes(userRole)){
          // console.log(`permissions.includes(${userRole})`);
          isAllowed = true;
          break;
        }          
      }
    }
    // console.log("isAllowed",isAllowed);
    return isAllowed;
  }

  
}