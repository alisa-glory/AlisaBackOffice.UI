import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  backOfficeApiUrl = environment.backOfficeApiUrl;

  private appUserName$ = new BehaviorSubject<string>('');
  private appUserRole$ = new BehaviorSubject<string>('');

  constructor() { }

  public getAppUserRole(){
    return this.appUserRole$.asObservable();
  }

  public setAppUserRole(role: string){
    this.appUserRole$.next(role);
  }  

  public getAppUserName(){
    return this.appUserName$.asObservable();
  }

  public setAppUserName(name: string){
    this.appUserName$.next(name);
  }  
  

}