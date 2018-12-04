import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Manager } from '../models/manager.model';
import { AuthService } from './auth.service';
import { Chart } from '../models/chart.model';

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
        return new Promise<Vehicle[]>((resolve, reject)=>
        {
            this.http.get('/api/vehicle', this.options)
                .subscribe((data:Vehicle[])=>{
                    resolve(data);
                },
                (error)=>{
                    reject(error);
                });
        });
    }

    public getVehicle(vehicle:Vehicle): Promise<Vehicle>
    {
        return new Promise<Vehicle>((resolve,reject)=>
        {
            this.http.get(`/api/vehicle/${vehicle.vid}`, this.options)
                .subscribe((data:Vehicle)=>{
                    resolve(data);
                },
                (error)=>{
                    reject(error);
                });
        });
    }

    public createVehicle(vehicle:Vehicle): Promise<Vehicle>
    {
        return new Promise<Vehicle>((resolve,reject)=>
        {
            this.http.post('/api/vehicle', vehicle, this.options)
                .subscribe((data:Vehicle)=>
                {
                    resolve(data);
                },
                (error)=>
                {
                    reject(error);
                });
        });
    }

    public saveVehicle(vehicle:Vehicle): Promise<Vehicle>
    {
        return new Promise<Vehicle>((resolve,reject)=>
        {
            this.http.put(`/api/vehicle/${vehicle.vid}`, vehicle, this.options)
                .subscribe((data:Vehicle)=>
                {
                    resolve(data);
                },
                (error)=>
                {
                    reject(error);
                });
        })
    }

    public updateMessage(vehicle:Vehicle): Promise<Vehicle>
    {
        return new Promise<Vehicle>((resolve,reject)=>
        {
            this.http.put(`/api/vehicle/message/${vehicle.vid}`, vehicle, this.options)
                .subscribe((data:Vehicle)=>
                {
                    resolve(data);
                },
                (error)=>
                {
                    reject(error);
                });
        });
    }

    public deleteVehicle(vehicle:Vehicle): Promise<Vehicle>
    {
        return new Promise<Vehicle>((resolve, reject) =>
        {
            this.http.delete(`/api/vehicle/${vehicle.vid}`, this.options)
                .subscribe((data: Vehicle) =>
                {
                    resolve(data);
                },
                (error) =>
                {
                    reject(error);
                });
        });
    }

    public createManager(manager:Manager): Promise<Manager>
    {
        return new Promise<Manager>((resolve, reject)=>
        {
            this.http.post('/api/manager', manager, this.options)
                .subscribe((data:Manager)=>
                {
                    resolve(data);
                },
                (error) =>
                {
                    reject(error);
                });
        });
    }

    public getManagers(): Promise<Manager[]>
    {
        return new Promise<Manager[]>((resolve, reject)=>
        {
            this.http.get('/manager', this.options)
                .subscribe((data:Manager[])=>
                {
                    resolve(data);
                },
                (error) =>
                {
                    reject(error);
                });
        });
    }

    public getManagerVehicles(manager:Manager): Promise<Vehicle[]>
    {
        return new Promise<Vehicle[]>((resolve, reject)=>
        {
            this.http.get(`/manager/${manager.username}`, this.options)
                .subscribe((data:Vehicle[])=>
                {
                    resolve(data);
                },
                (error)=>
                {
                    reject(error);
                });
        });
    }

    public updateManagerVehicles(manager:Manager, vehicle:Vehicle): Promise<Vehicle>
    {
        return new Promise<Vehicle>((resolve, reject)=>
        {
            this.http.put(`/manager/${manager.username}`, vehicle, this.options)
                .subscribe((data:Vehicle)=>
                {
                    resolve(data);
                },
                (error)=>
                {
                    reject(error);
                });
        });
    }

    public deleteManagerVehicles(manager:Manager): Promise<Vehicle>
    {
        return new Promise<Vehicle>((resolve, reject)=>
        {
            this.http.delete(`/manager/${manager.username}`, this.options)
                .subscribe((data:any)=>
                {
                    resolve(data);
                },
                (error)=>
                {
                    reject(error);
                });
        });
    }

    public getManagerChart(manager:Manager): Promise<Chart>
    {
        return new Promise<Chart>((resolve, reject)=>
        {
            this.http.get(`/manager/chart/${manager.username}`, this.options)
                .subscribe((data:Chart)=>
                {
                    resolve(data);
                },
                (error)=>
                {
                    reject(error);
                });
        });
    }

    public updateManagerChart(manager:Manager, chart:Chart): Promise<Chart>
    {
        return new Promise<Chart>((resolve, reject)=>
        {
            this.http.put(`/manager/chart/${manager.username}`, chart, this.options)
                .subscribe((data:Chart)=>
                {
                    resolve(chart);
                },
                (error)=>
                {
                    reject(error);
                });
        });
    }

    public activateManagerChart(manager:Manager, chart:Chart): Promise<Chart>
    {
        return new Promise<Chart>((resolve, reject)=>
        {
            this.http.put(`/manager/chart/update/${manager.username}`, chart, this.options)
                .subscribe((data:Chart)=>
                {
                    resolve(chart);
                },
                (error)=>
                {
                    reject(error);
                });
        });
    }
}
