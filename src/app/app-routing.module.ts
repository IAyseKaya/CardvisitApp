import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeaderComponent} from "./component/header/header.component";
import {HomeComponent} from "./component/home/home.component";
import {AboutComponent} from "./component/about/about.component";

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:'about',
    component:AboutComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
