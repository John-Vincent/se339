import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Manager } from '../models/manager.model';

@Component(
    {
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.css']
    }
)
export class RegisterComponent implements OnInit
{
    @ViewChild('username')
    private username;

    @ViewChild('password')
    private password;

    private manager: Manager;

    constructor(
        private router: Router,
        private authService: AuthService
    ) { } 

    ngOnInit() { }

    navigateToLogin()
    {
        this.router.navigateByUrl('/login'); 
    }

    register()
    {
        // console.log(this.username.nativeElement.value);
        // console.log(this.password.nativeElement.value);
        this.manager = new Manager(this.username, this.password);
        this.authService.register(this.manager).then(this.registerSuccessful).catch(this.registerFailed);
    }

    private registerSuccessful(res)
    {
        alert("Register Successful");
        console.log(res);
    }

    private registerFailed(err)
    {
        alert("Register Failed, try again");
        console.log(err);
    }
}
