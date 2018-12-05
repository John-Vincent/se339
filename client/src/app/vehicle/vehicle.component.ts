import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { Vehicle, VehicleData } from '../models/vehicle.model';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

    private vehicle: Vehicle;

    private edit:boolean = false;

    private url:SafeUrl;

    constructor(
        private api: ApiService,
        private auth: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        var id = this.route.snapshot.paramMap.get('id');
        this.vehicle = new Vehicle();
        this.vehicle.vid = +id;
        this.fetchVehicle();
    }

    private fetchVehicle()
    {
        var that = this;
        this.api.getVehicle(this.vehicle)
            .then((res) => {
                that.vehicle = res;
                this.url = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.google.com/maps/embed/v1/view?key=AIzaSyAcIDWkAcEX_Ck8UsD61BTxCEJrYZ5wta0&center=${res.mrLat},${res.mrLong}&zoom=18&maptype=satellite`);
            })
            .catch((error: HttpErrorResponse) => {
                alert(error.message);
            })
    }

    public cancelEdit()
    {
        this.edit = false;
        this.fetchVehicle();
    }

    public editVehicle()
    {
        this.edit = true;
    }

    public alterValue(field:string, event:any)
    {
        this.vehicle[field] = event.target.value;
    }

    public saveVehicle()
    {
        this.api.saveVehicle(this.vehicle)
        .then((ans)=>
        {
            this.vehicle = ans;
            this.edit = false;
        })
        .catch((err)=>
        {
            console.log(err);
            alert(err.message);
            this.fetchVehicle();
        });
    }

}
