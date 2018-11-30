import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from "./manager.component";
import { ManagerService } from "./manager.service";

@NgModule({
    declarations: [ManagerComponent],
    imports: [
        CommonModule
    ],
    providers: [
        ManagerService
    ]
})
export class ManagerModule { }
