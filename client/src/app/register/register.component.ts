import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

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

    constructor(
        private router: Router
    ) { }

    ngOnInit() { }

    navigateToLogin()
    {
        this.router.navigateByUrl('/');
    }

    register() 
    {
        //TODO
        console.log(this.username.nativeElement.value);
        console.log(this.password.nativeElement.value);
    }
}
