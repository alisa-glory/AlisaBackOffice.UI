import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guard/admin.guard';
import { AboutComponent } from '../views/about/about.component';
import { HomeComponent } from '../views/home/home.component';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './views/users/users.component';

const routes: Routes = [
  { path:'', component: AdminComponent,
    pathMatch: "prefix",
    canActivate: [AdminGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'users', component: UsersComponent },      
      { path: 'about', component: AboutComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
