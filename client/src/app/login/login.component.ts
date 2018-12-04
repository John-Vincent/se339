import { Component, OnInit, ViewChild } from '@angular/core';
import { Manager } from '../models/manager.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component(
    {
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    }
)

/** 
 * Login Component
 * @author Matt Bechtel | mattbechtel123@gmail.com 
 * @date 2018-12-03 20:42:29 
 */
export class LoginComponent implements OnInit 
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

    ngOnInit() 
    {
    }

    /**
     * On 'Login' button press, send login information to server
     */
    login() 
    {
        //TODO
        console.log(this.username.nativeElement.value);
        console.log(this.password.nativeElement.value);

        // this.manager = new Manager(this.username, this.password);

        // this.authService.login(this.manager).then(this.loginSuccessful).catch(this.loginFailed);
    }

    private loginSuccessful(res)
    {
        alert("Login Successful");
        console.log(res);
    }

    private loginFailed(err)
    {
        console.log(err);
        alert("Login Failed, try again");
    }

    /**
     * On 'Register' button press, redirect user to register page
     */
    navigateToRegister()
    {
        this.router.navigateByUrl('/register');
    }
}


