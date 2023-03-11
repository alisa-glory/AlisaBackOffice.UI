import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { AboutComponent } from './views/about/about.component';
import { HomeComponent } from './views/home/home.component';
import { PageNotfoundComponent } from './views/page-notfound/page-notfound.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginFormComponent } from './views/login-form/login-form.component';
import { PageUnauthorizeComponent } from './views/page-unauthorize/page-unauthorize.component';
import { MessagesListComponent } from './views/messages-list/messages-list.component';
import { MessageDetailComponent } from './views/message-detail/message-detail.component';
import { AdminGuard } from './guard/admin.guard';
import { ManagerGuard } from './guard/manager.guard';
import { TrainingListComponent } from './views/training-list/training-list.component';
import { EmbedListComponent } from './views/embed-list/embed-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    // pathMatch: 'full',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'training',
        component: TrainingListComponent,
      },
      {
        path: 'messages',
        component: MessagesListComponent,
        canActivate: [ManagerGuard],
      },
      {
        path: 'messages/:id',
        component: MessageDetailComponent,
        canActivate: [ManagerGuard],
      },     
      {
        path: 'embedded-list',
        component: EmbedListComponent,
        canActivate: [ManagerGuard],
      },      

      {
        path: 'about',
        component: AboutComponent,
      },
    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    // pathMatch: 'prefix',
    children: [
      {
        path: 'login',
        component: LoginFormComponent
      }
    ]
  },
  {
    path: 'unauthorize',
    component: PageUnauthorizeComponent
  },  
  { 
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) ,
  },
  {
    path: '**',
    component: PageNotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
