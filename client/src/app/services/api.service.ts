import { Injectable } from '@angular/core';
import { Vehicle } from '../models/vehicle.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Manager } from '../models/manager.model';
import { AuthService } from './auth.service';
import { Chart } from '../models/chart.model';
import { Router } from '@angular/router';

@Injectable()
export class ApiService {

    private unauth = (error)=>
    {
        if(error instanceof HttpErrorResponse)
        {
            if(error.status == 401)
            {
                localStorage.removeItem('expiration');
                localStorage.removeItem('access_token');
                this.router.navigateByUrl('/login');
            }
            else
            {
                throw error;
            }
        }
        else
        {
            return error;
        }
    }

    private getOptions = ()=>
    {
        return {headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.auth.getToken()})};
    }

    constructor(
        private http: HttpClient,
        private auth: AuthService,
        private router: Router
    ) { }

    public getVehicles(): Promise<Vehicle[]>
    {
        return new Promise<Vehicle[]>((resolve, reject)=>
        {
            this.http.get('/api/vehicle', this.getOptions())
                .subscribe((data:Vehicle[])=>{
                    resolve(data);
                },
                (error)=>{
                    reject(error);
                });
        }).catch(this.unauth);
    }

    public getVehicle(vehicle: Vehicle): Promise<Vehicle>
    {
        return new Promise<Vehicle>((resolve,reject)=>
        {
            this.http.get(`/api/vehicle/${vehicle.vid}`, this.getOptions())
                .subscribe((data:Vehicle)=>{
                    resolve(data);
                },
                (error)=>{
                    reject(error);
                });
        }).catch(this.unauth);
    }

    public createVehicle(vehicle: Vehicle): Promise<Vehicle>
    {
        return new Promise<Vehicle>((resolve,reject)=>
        {
            this.http.post('/api/vehicle', vehicle, this.getOptions())
                .subscribe((data:Vehicle)=>
                {
                    resolve(data);
                },
                (error)=>
                {
                    reject(error);
                });
        }).catch(this.unauth);
    }

    public saveVehicle(vehicle: Vehicle): Promise<Vehicle>
    {
        return new Promise<Vehicle>((resolve,reject)=>
        {
            this.http.put(`/api/vehicle/new/${vehicle.vid}`, vehicle, this.getOptions())
                .subscribe((data:Vehicle)=>
                {
                    resolve(data);
                },
                (error)=>
                {
                    reject(error);
                });
        }).catch(this.unauth);
    }

    public updateMessage(vehicle: Vehicle): Promise<Vehicle>
    {
        return new Promise<Vehicle>((resolve,reject)=>
        {
            this.http.put(`/api/vehicle/message/${vehicle.vid}`, vehicle, this.getOptions())
                .subscribe((data:Vehicle)=>
                {
                    resolve(data);
                },
                (error)=>
                {
                    reject(error);
                });
        }).catch(this.unauth);
    }

    public deleteVehicle(vehicle: Vehicle): Promise<Vehicle>
    {
        return new Promise<Vehicle>((resolve, reject) =>
        {
            this.http.delete(`/api/vehicle/${vehicle.vid}`, this.getOptions())
                .subscribe((data: Vehicle) =>
                {
                    resolve(data);
                },
                (error) =>
                {
                    reject(error);
                });
        }).catch(this.unauth);
    }

    public createManager(manager: Manager): Promise<Manager>
    {
        return new Promise<Manager>((resolve, reject)=>
        {
            this.http.post('/api/manager', manager, this.getOptions())
                .subscribe((data:Manager)=>
                {
                    resolve(data);
                },
                (error) =>
                {
                    reject(error);
                });
        }).catch(this.unauth);
    }

    public getManagers(): Promise<Manager[]>
    {
        return new Promise<Manager[]>((resolve, reject)=>
        {
            this.http.get('/api/manager', this.getOptions())
                .subscribe((data:Manager[])=>
                {
                    resolve(data);
                },
                (error) =>
                {
                    reject(error);
                });
        }).catch(this.unauth);
    }

    public getManagerVehicles(manager: Manager): Promise<Vehicle[]>
    {
        return new Promise<Vehicle[]>((resolve, reject)=>
        {
            this.http.get(`/api/manager/${manager.username}`, this.getOptions())
                .subscribe((data:Vehicle[])=>
                {
                    resolve(data);
                },
                (error)=>
                {
                    reject(error);
                });
        }).catch(this.unauth);
    }

    public updateManagerVehicles(manager:Manager, vehicle:Vehicle): Promise<any[]>
    {
        return new Promise<any[]>((resolve, reject)=>
        {
            this.http.put(`/api/manager/${manager.username}`, vehicle, this.getOptions())
                .subscribe((data:any[])=>
                {
                    resolve(data);
                },
                (error)=>
                {
                    reject(error);
                });
        }).catch(this.unauth);
    }

    public deleteManagerVehicles(manager: Manager): Promise<Vehicle>
    {
        return new Promise<Vehicle>((resolve, reject)=>
        {
            this.http.delete(`/api/manager/${manager.username}`, this.getOptions())
                .subscribe((data:any)=>
                {
                    resolve(data);
                },
                (error)=>
                {
                    reject(error);
                });
        }).catch(this.unauth);
    }

    public getManagerChart(manager: Manager): Promise<Chart>
    {
        return new Promise<Chart>((resolve, reject)=>
        {
            this.http.get(`/api/manager/chart/${manager.username}`, this.getOptions())
                .subscribe((data:Chart)=>
                {
                    resolve(data);
                },
                (error)=>
                {
                    reject(error);
                });
        }).catch(this.unauth);
    }

    public updateManagerChart(manager: Manager, chart: Chart): Promise<Chart>
    {
        return new Promise<Chart>((resolve, reject)=>
        {
            this.http.put(`/api/manager/chart/${manager.username}`, chart, this.getOptions())
                .subscribe((data:Chart)=>
                {
                    resolve(chart);
                },
                (error)=>
                {
                    reject(error);
                });
        }).catch(this.unauth);
    }

    public activateManagerChart(manager: Manager, chart: Chart): Promise<Chart>
    {
        return new Promise<Chart>((resolve, reject)=>
        {
            this.http.put(`/api/manager/chart/update/${manager.username}`, chart, this.getOptions())
                .subscribe((data:Chart)=>
                {
                    resolve(chart);
                },
                (error)=>
                {
                    reject(error);
                });
        }).catch(this.unauth);
    }
}
