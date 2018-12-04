import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient
    ) { }

    public login(user:User): Promise<any>
    {
        return new Promise((resolve, reject)=>
        {
            this.http.post('/api/login', user)
                .subscribe((data:any)=>
                {
                    localStorage.setItem('access_token', data.token);
                    localStorage.setItem('experation', data.expire);
                    resolve(data);
                },
                (error)=>
                {
                    reject(error);
                });
        });
    }

    public register(user:User): Promise<any>
    {
        return new Promise((resolve, reject)=>
        {
            this.http.post('/api/register', user)
                .subscribe((data:any)=>{
                    resolve(user);
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
        localStorage.removeItem('experation');
    }

    public getExpiration(): Date
    {
        return new Date(localStorage.getItem('exeration'));
    }

    public getToken(): String
    {
        return localStorage.getItem('access_token');
    }
}
