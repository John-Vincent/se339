import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from './manager.service'
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { Manager } from '../models/manager.model';
import { Vehicle } from '../models/vehicle.model';


@Component(
    {
        selector: 'app-manager',
        templateUrl: './manager.component.html',
        styleUrls: ['./manager.component.css']
    }
)
export class ManagerComponent implements OnInit 
{
    private manager: Manager;
    private addingVehicle: boolean;
    private creatingVehicle: boolean;
    private allVehicles: Array<Vehicle>

    constructor(
        private authService: AuthService,
        private apiService: ApiService,
        private router: Router 
    ) { }

    ngOnInit() 
    {
        this.addingVehicle = false;
        this.creatingVehicle = false;
        this.manager = this.authService.getManager();
        var that = this;
        this.apiService.getVehicles().then(function(data){
            that.allVehicles = data;
        }).catch((err) => 
        {
            console.log("Error loading vehicles", err);
        });
        console.log(this.manager); 
    }

    addVehicleView()
    {
        this.addingVehicle = true;
    }

    addVehicle(vehicle: Vehicle)
    {
        console.log("Adding Vehicle: " + vehicle);
    }

    createVehicleView()
    {
        this.creatingVehicle = true;
    }
}
