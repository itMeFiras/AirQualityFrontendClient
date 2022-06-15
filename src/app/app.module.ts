import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes  } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HeadervisitComponent } from './navbars/headervisit/headervisit.component';
import { HeaderuserComponent } from './navbars/headeruser/headeruser.component';
import { FooterComponent } from './navbars/footer/footer.component';
import { ResetpasswordComponent } from './authentication/resetpassword/resetpassword.component';
import { UserlistComponent } from './admin/userlist/userlist.component';
import { MapComponent } from './views/map/map.component';
import { ProfileComponent } from './views/profile/profile.component';
import { EditProfileComponent } from './views/edit-profile/edit-profile.component';
import { ValidatorDirective } from './models/validator.directive';
import { UniqueNameDirective } from './models/unique-name.directive';
import { SidebarComponent } from './views/sidebar/sidebar.component';
import { HomeComponent } from './views/home/home.component';
import { StatsComponent } from './views/stats/stats.component';
import { RequestComponent } from './views/request/request.component';
import { MyNodesComponent } from './views/my-nodes/my-nodes.component';
import { ReqmarkerComponent } from './views/reqmarker/reqmarker.component';

const appRoutes : Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'register',component:RegisterComponent},
  {path: 'resetPassword',component:ResetpasswordComponent},
  {path: 'admin/userlist',component:UserlistComponent},
  {path: 'profile',component:ProfileComponent},
  {path: 'map', component:MapComponent},
  {path: 'profile/edit/:id',component:EditProfileComponent},
  {path: 'home',component:HomeComponent},
  {path: 'node/:id',component:StatsComponent},
  {path: 'myNodes',component:MyNodesComponent},
  {path: 'request',component:RequestComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeadervisitComponent,
    HeaderuserComponent,
    FooterComponent,
    ResetpasswordComponent,
    UserlistComponent,
    MapComponent,
    ProfileComponent,
    EditProfileComponent,
    ValidatorDirective,
    UniqueNameDirective,
    SidebarComponent,
    HomeComponent,
    StatsComponent,
    RequestComponent,
    MyNodesComponent,
    ReqmarkerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
