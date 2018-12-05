import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleComponent } from './vehicle.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';

const routes: Routes = [
    { path: '', component: VehicleListComponent },
    { path: ':id', component: VehicleComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VehicleRoutingModule { }