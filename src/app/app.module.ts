import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/material.module';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginFormComponent } from './views/login-form/login-form.component';
import { PageNotfoundComponent } from './views/page-notfound/page-notfound.component';
import { HomeComponent } from './views/home/home.component';
import { PageUnauthorizeComponent } from './views/page-unauthorize/page-unauthorize.component';
import { AboutComponent } from './views/about/about.component';
import { MessagesListComponent } from './views/messages-list/messages-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { AdminGuard } from './guard/admin.guard';
import { MessageDetailComponent } from './views/message-detail/message-detail.component';
import { TrainingListComponent } from './views/training-list/training-list.component';
import { CompletionEditorComponent } from './views/completion-editor/completion-editor.component';
import { DataNotfoundComponent } from './views/data-notfound/data-notfound.component';
import { EmbedListComponent } from './views/embed-list/embed-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginLayoutComponent,
    MainLayoutComponent,
    LoginFormComponent,
    PageNotfoundComponent,
    HomeComponent,
    PageUnauthorizeComponent,
    AboutComponent,
    MessagesListComponent,
    MessageDetailComponent,
    TrainingListComponent,
    CompletionEditorComponent,
    DataNotfoundComponent,
    EmbedListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService, AuthGuard, AdminGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
