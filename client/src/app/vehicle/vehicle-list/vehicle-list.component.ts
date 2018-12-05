import { Component, OnInit } from '@angular/core';
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


    constructor(
        private api: ApiService,
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        var that = this;
        this.api.getVehicles()
            .then((res) => {
                that.vehicles = res;
            })
            .catch((error: HttpErrorResponse) => {
                alert(error.message);
            });
    }

    public select(vehicle:Vehicle)
    {
        if(vehicle.vid)
            this.router.navigateByUrl(`/vehicle/${vehicle.vid}`);
    }

    public delete(vehicle:Vehicle)
    {

    }

}
