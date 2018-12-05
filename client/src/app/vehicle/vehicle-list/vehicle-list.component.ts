import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Vehicle, VehicleData } from '../../models/vehicle.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-vehicle-list',
    templateUrl: './vehicle-list.component.html',
    styleUrls: ['../vehicle.component.css']
})
export class VehicleListComponent implements OnInit {

    private vehicles: Vehicle[];
    private creatingVehicle: Boolean;
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
        private api: ApiService,
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.getVehicles();
    }

    createVehicle()
    {
        this.createdVehicle = new Vehicle(this.enteredVid.nativeElement.value, this.enteredGasTankSize.nativeElement.value, this.enteredBitrate.nativeElement.value, this.enteredMsg.nativeElement.value);
        this.api.createVehicle(this.createdVehicle)
            .then(this.createVehicleSuccess)
            .then(this.getVehicles)
            .catch(this.createVehicleFailure);
    }

    setCreateVehicleView()
    {
        this.creatingVehicle = true;
    }

    unsetCreateVehicleView()
    {
        this.creatingVehicle = false;
    }

    private createVehicleSuccess = (() =>
    {
        var that = this;
        return (res) => 
        {
            alert("Vehicle Successfully Created");
            that.creatingVehicle = false;
            console.log(res);

            that.enteredBitrate.nativeElement.value = "";
            that.enteredVid.nativeElement.value = "";
            that.enteredGasTankSize.nativeElement.value = "";
            that.enteredMsg.nativeElement.value = "";
        }
    })();

    private createVehicleFailure(err)
    {
        alert("Vehicle Creation Failed");
        console.log(err);
    }


    private getVehicles = (()=>
    {
        var that = this;
        return ()=>
        {
            that.api.getVehicles()
                .then((res) => {
                    that.vehicles = res;
                })
                .catch((error: HttpErrorResponse) => {
                    alert(error.message);
                });
        }
    })();

    public select(vehicle:Vehicle)
    {
        if(vehicle.vid)
            this.router.navigateByUrl(`/vehicle/${vehicle.vid}`);
    }

    public delete(vehicle:Vehicle)
    {
        this.api.deleteVehicle(vehicle)
            .catch((error)=>
            {
                alert(error.message);
                console.log(error);
            });
        this.getVehicles();
    }

}
