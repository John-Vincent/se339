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

    @ViewChild('confirmPassword')
    private confirmPassword;

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
        if(this.password.nativeElement.value == this.confirmPassword.nativeElement.value)
        {
            this.manager = new Manager(this.username.nativeElement.value, this.password.nativeElement.value);
            this.authService.register(this.manager)
                .then(this.registerSuccessful)
                .catch(this.registerFailed);
        } 
        else
        {
            alert("Passwords do not match");
        }        
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
