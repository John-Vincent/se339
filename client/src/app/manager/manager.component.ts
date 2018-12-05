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
    private addingVehicle: Boolean;
    private creatingVehicle: Boolean;
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
        var that = this;
        this.addingVehicle = false;
        this.creatingVehicle = false;

        this.manager = this.authService.getManager();
        this.getAndStoreManagerVehicles(that);
        this.getAndStoreAllVehicles(that);
    }

    viewVehicle(vehicle: Vehicle)
    {
        console.log(vehicle);
        this.router.navigateByUrl(`/vehicle/${vehicle.vid}`);
    }

    deleteVehicle(vehicle: Vehicle)
    {
        var that = this;
        console.log("Deleting vehicle ", JSON.stringify(vehicle));
        this.apiService.deleteManagerVehicle(this.manager, vehicle)
            .then((res) => 
            {
                console.log(res);
                that.getAndStoreManagerVehicles(that);
            })
            .catch((err) =>
            {
                console.log(err);
            })
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
        console.log("Adding Vehicle: " + JSON.stringify(vehicle));
        var that = this;

        this.apiService.updateManagerVehicles(this.manager, vehicle)
            .then((res) => 
            {
                //this code will be removed in favor of updating from the db
                alert("Vehicle added successfully");
                that.manager.vehicles = res;
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

    createVehicle()
    {
        this.createdVehicle = new Vehicle(this.enteredVid.nativeElement.value, this.enteredGasTankSize.nativeElement.value, this.enteredBitrate.nativeElement.value, this.enteredMsg.nativeElement.value);
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

    private getAndStoreAllVehicles(that: any)
    {
        this.apiService.getVehicles()
            .then((data) => {
                that.allVehicles = data;
            }).catch((err) => 
            {
                console.log("Error loading vehicles", err);
            });
    }

    private getAndStoreManagerVehicles(that: any)
    {
        that.apiService.getManagerVehicles(that.manager)
            .then((data) => {
                that.manager.vehicles = data;
            }).catch((err) => 
            {
                console.log("Error loading manager's vehicles", err);
            });
    }
}
