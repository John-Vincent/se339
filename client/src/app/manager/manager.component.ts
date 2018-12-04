import { Component, OnInit, ViewChild } from '@angular/core';
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
    private createdVehicle: Vehicle;

    @ViewChild('vid')
    private enteredVid;

    @ViewChild('gasTankSize')
    private enteredGasTankSize;
    
    @ViewChild('bitrate')
    private enteredBitrate;

    @ViewChild('msg')
    private enteredMsg;

    constructor(
        private authService: AuthService,
        private apiService: ApiService,
        private router: Router 
    ) { }

    ngOnInit() 
    {
        this.addingVehicle = false;
        this.creatingVehicle = false;

        //change this to api calls
        this.manager = this.authService.getManager();

        this.getAndStoreAllVehicles();
        console.log(this.manager); 
    }

    setAddVehicleView()
    {
        this.addingVehicle = true;
    }

    unsetAddVehicleView()
    {
        this.addingVehicle = false;
    }

    addVehicle(vehicle: Vehicle)
    {
        console.log("Adding Vehicle: " + vehicle);
        var that = this;

        this.apiService.updateManagerVehicles(this.manager, vehicle)
            .then((res) => 
            {
                //this code will be removed in favor of updating from the db
                alert("Vehicle added successfully");
                that.manager.vehicles = res;
                console.log(res);
            })
            .catch(this.addVehicleFailure);
    }



    private addVehicleFailure(err)
    {
        alert("Vehicle addition failed");
        console.log(err);
    }

    setCreateVehicleView()
    {
        this.creatingVehicle = true;
    }

    unsetCreateVehicleView()
    {
        this.creatingVehicle = false;
    }

    private getAndStoreAllVehicles()
    {
        var that = this;

        this.apiService.getVehicles()
            .then((data) => {
                that.allVehicles = data;
            }).catch((err) => 
            {
                console.log("Error loading vehicles", err);
            });
    }

    createVehicle()
    {
        this.createdVehicle = new Vehicle(this.enteredVid, this.enteredGasTankSize, this.enteredBitrate, this.enteredMsg);
        this.apiService.updateManagerVehicles(this.manager, this.createdVehicle)
            .then(this.createVehicleSuccess)
            .catch(this.createVehicleFailure);
    }

    private createVehicleSuccess(res)
    {
        alert("Vehicle Successfully Created");
        console.log(res);
    }

    private createVehicleFailure(err)
    {
        alert("Vehicle Creation Failed");
        console.log(err);
    }
}
