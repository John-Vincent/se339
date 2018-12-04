import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Manager } from '../models/manager.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient
    ) { }

    public login(user:Manager): Promise<any>
    {
        return new Promise((resolve, reject)=>
        {
            this.http.post('/api/manager/login', user)
                .subscribe((data:any)=>
                {
                    localStorage.setItem('access_token', data.token);
                    localStorage.setItem('experation', data.expire);
                    localStorage.setItem('manager', JSON.stringify(data.manager));
                    resolve(data);
                },
                (error)=>
                {
                    reject(error);
                });
        });
    }

    public register(user:Manager): Promise<any>
    {
        return new Promise((resolve, reject)=>
        {
            this.http.post('/api/manager', user)
                .subscribe((data:any)=>{
                    resolve(data);
                },
                (error)=>
                {
                    reject(error);
                });
        });
    }

    public logout()
    {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expiration');
    }

    public getExpiration(): Date
    {
        return new Date(localStorage.getItem('expiration'));
    }

    public getToken(): string
    {
        return localStorage.getItem('access_token');
    }

    public getManager(): Manager
    {
        return JSON.parse(localStorage.getItem('manager'));
    }
}
