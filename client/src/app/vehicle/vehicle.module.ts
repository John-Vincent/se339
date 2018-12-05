import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleComponent } from './vehicle.component';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';
import { VehicleRoutingModule } from './vehicle-routing.module';

@NgModule({
  declarations: [VehicleComponent, VehicleListComponent],
  imports: [
    CommonModule,
    VehicleRoutingModule
  ]
})
export class VehicleModule { }
