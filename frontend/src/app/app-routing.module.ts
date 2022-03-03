import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './home/register/register.component';
import { LoginComponent } from './home/login/login.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'login',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
