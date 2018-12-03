import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {path: '', component: LoginComponent, canActivate: [AuthGuardService]},
    {path: 'manager', loadChildren:'./manager/manager.module#ManagerModule', canActivate: [AuthGuardService]},
    {path: 'vehicle', loadChildren:'./vehicle/vehicle.module#VehicleModule', canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
