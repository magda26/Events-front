import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./helpers/auth.guard";


const routes: Routes = [
  {path: 'events' , component: EventsComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: 'events'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
