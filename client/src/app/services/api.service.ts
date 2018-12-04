import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Manager } from '../models/manager.model';
import { AuthService } from './auth.service';

@Injectable()
export class ApiService {

    private options = {
        headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.auth.getToken()})
    }

    constructor(
        private http: HttpClient,
        private auth: AuthService
    ) { }

    public getVehicles(): Promise<Vehicle[]>
    {
        this.http.get('/api/vehicle', this.options)
        return null;
    }

    public getVehicle(vehicle:Vehicle): Promise<Vehicle>
    {
        return null;
    }

    public createVehicle(vehicle:Vehicle): Promise<Vehicle>
    {
        return null;
    }

    public saveVehicle(vehicle:Vehicle): Promise<Vehicle>
    {
        return null;
    }

    public updateMessage(vehicle:Vehicle): Promise<Vehicle>
    {
        return null;
    }

    public deleteVehicle(vehicle:Vehicle): Promise<Vehicle>
    {
        return null;
    }
}
