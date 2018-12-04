import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ManagerComponent } from './manager/manager.component';

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'login', component: LoginComponent, canActivate: [AuthGuardService]},
    {path: 'dashboard', component:ManagerComponent, canActivate: [AuthGuardService]},
    {path: 'vehicle', loadChildren: './vehicle/vehicle.module#VehicleModule', canActivate: [AuthGuardService]},
    {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
