# ClinicAssistant.UI
# Undo Last Git Commit with reset
git reset --soft HEAD~1

# Add all files using git add except one directory
git add -- . ':!/.angular'

# Resource

Angular: Hide Navbar Menu from Login page
https://loiane.com/2017/08/angular-hide-navbar-login-page/

# Ex1
https://stackblitz.com/edit/angular-login-hide-navbar-ngif?file=src%2Fapp%2Fapp-material%2Fapp-material.module.ts

# Ex2
https://stackblitz.com/edit/angular-login-hide-navbar-layout?file=src%2Fapp%2Fapp.component.ts

# Source code
https://github.com/loiane/angular-login-hide-navbar

# Local storage
https://www.youtube.com/watch?v=Ro9j53Sk1dY
https://www.youtube.com/watch?v=pZn8mCAuBDU&t=160

# Add Material
ng add @angular/material

# create app-material module
ng g m app-material

# Add Auth Guard
ng g guard auth/auth

# Add Auth Service
ng g service auth/auth

https://www.primefaces.org/primeng/
https://github.com/primefaces/primeng

asychronousใน javascript ทำงานยังไงกันแน่นะ
https://www.youtube.com/watch?v=fTiMWu5uPr8&list=PLI_imISwfpmmZOx2MvI3mLF0xU0xPIY76

รู้จัก ReactiveFormsModule และ FormsModule คืออะไร แตกต่างกันอย่างไร
https://www.youtube.com/watch?v=WtOEIAde5Lc

สร้างหน้าฟอร์ม EP 2.1 - จัดการหน้าฟอร์มด้วย FormsModule
https://www.youtube.com/watch?v=TKi2fW8mWUE

สร้างหน้าฟอร์ม EP 2.2 - จัดการหน้าฟอร์มด้วย ReactiveFormsModule
https://www.youtube.com/watch?v=tuv_CXkjsIM

Validate ใน formControl หลายตัวยังไง ใน ReactiveFormsModule
https://www.youtube.com/watch?v=nR5mD-DORgc

--dry-run ในคำสั่ง ng generate คืออะไร มาดูกัน
https://www.youtube.com/watch?v=YDb-jzqU0Ps

สร้าง Module พร้อม import อัตโนมัติ ด้วยคำสั่ง cli - Angular 11
https://www.youtube.com/watch?v=yqN7ckn-iqQ


คำสั่งสั้นๆ สร้าง lazyload routing คำสั่งเดียวได้ module,component,routing ม้วนเดียวจบ - Angular 11
https://www.youtube.com/watch?v=1pqkoeK9UV0
ng generate module admin --route admin --module app.module --dry-run

EP 20.0 เปลี่ยน Website ให้สวยดูดี ด้วยการติดตั้ง UI Component (PrimeNG) - Angular 11
https://www.youtube.com/watch?v=oz42LP9qkjo

EP 21.0 สอนใช้ PrimeNG Table Component เบื้องต้นแสดงผลข้อมูลแบบตาราง - Angular
https://www.youtube.com/watch?v=DkKHUHtLJX4


Angular 12 Login and Registration example with JWT & Web Api
https://www.bezkoder.com/angular-12-jwt-auth/

Angular 14 JWT Authentication & Authorization example
https://www.bezkoder.com/angular-14-jwt-auth/

# Install @auth0/angular-jwt for decript Token
npm i @auth0/angular-jwt

JWT Token - Role based Dashboard | Display name on header using Token | Angular Auth Series Part 8 |
https://www.youtube.com/watch?v=__6EKynv2lo

Angular - Logout on 401 Unauthorized or 403 Forbidden HTTP Response with Interceptor
https://jasonwatmore.com/post/2022/12/02/angular-logout-on-401-unauthorized-or-403-forbidden-http-response-with-interceptor

Handling HTTP Response Errors | Angular HTTP | Angular 13+
https://www.youtube.com/watch?v=tk4msPsp3kM&t=769

Route guard in angular 13 | role based authentication implementation| angular 13 tutorial #19
https://www.youtube.com/watch?v=qehzscbZyVY

Mat-Icon List : 900+ Angular Material Icons
https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/

Angular State Management ด้วย RxJS ตอนที่ 1 อธิบายโครงสร้าง state management คืออะไร
https://www.youtube.com/watch?v=et_TnckOpD4
src/store

Angular State Management ด้วย RxJS ตอนที่ 2 สร้างกระบวนการ Action, Reducer, Selector
https://www.youtube.com/watch?v=sXC0ksqkKMg&t=213s


อย่ายิง API หลายครั้งเกินความจำเป็น มารู้จัก interceptor และทำ caching กันดีกว่า - Angular
https://www.youtube.com/watch?v=0_rPPvvnS-I
app/interceptors
ng g interceptor caching --dry-run

The RESTful Pokémon API
https://pokeapi.co/
https://countrystatecity.in/

Angular 13 CRUD with Angular Material UI | json-server | Angular Reactive Form
https://www.youtube.com/watch?v=jGbP620NahE&t=8s

REST API สร้างด้วย JSON Server
https://teerapuch.com/developer/rest-api-json-server/
เรียนรู้การใช้งาน JSON Server สำหรับสร้างและทดสอบ Fake REST API ให้กับ Application
https://www.youtube.com/watch?v=mrWeV3ezi8k

@angular/material-moment-adapter
https://www.npmjs.com/package/@angular/material-moment-adapter
npm i @angular/material-moment-adapter

Auto Complete ที่อยู่ อย่างที่มันควรเป็น
https://medium.com/earthchie/%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%9A-auto-complete-%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AD%E0%B8%A2%E0%B8%B9%E0%B9%88%E0%B9%84%E0%B8%97%E0%B8%A2-%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A1%E0%B8%B1%E0%B8%99%E0%B8%84%E0%B8%A7%E0%B8%A3%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99-27360185d86a
Demo
https://earthchie.github.io/jquery.Thailand.js/

Web App—Auto Complete สำหรับข้อมูลที่อยู่
https://adamblog.co/web-app-auto-complete-thailand-address/

Using Angular observable pipe with example
https://www.tektutorialshub.com/angular/angular-observable-pipe/

Create separate module for angular material components | Angular Tutorial
https://www.youtube.com/watch?v=UBBX6pVrMjY

# Create shared MaterialModule
ng g m shared/material --m=app --flat --dry-run

Angular Material 14 Reactive Forms Validation Tutorial
https://www.positronx.io/angular-material-reactive-forms-validation-tutorial/
https://github.com/SinghDigamber/angular8-reactive-forms


Angular Material 13 Server Side Table Pagination Example
https://www.freakyjolly.com/angular-material-12-server-side-table-pagination-example/

Pagination on Angular Material Design - Show page numbers or remove the row count
https://stackoverflow.com/questions/54124605/pagination-on-angular-material-design-show-page-numbers-or-remove-the-row-coun

Angular Material table server side pagination, sorting, filter with mongo DB express JS
https://www.youtube.com/watch?v=KR_5uT6fDUw
# MatSort => 6:40
# Display filter input box and sort options => 12:10
# NodeJs Express => 17:58
# selecttion => 24:37
# Display columns => 25:03
# Display image => 26:44
# PageEvent => 27:20
# Keyword && Sort => 28:16
# Filter => 31:58
# Input event$ => 32:38
# read parameters from header server side => 35:51
# select multi columns search => 34:04
# fuzzy search mongoose module => 37:20

Angular Flex-Layout
https://github.com/angular/flex-layout

Binding Angular Material Select to a Reactive Form Control
https://fireflysemantics.medium.com/binding-angular-material-select-to-a-reactive-form-control-39e850ef6d5
https://stackblitz.com/edit/angular-material-select-with-form-control?file=src%2Fapp%2Fapp.component.ts