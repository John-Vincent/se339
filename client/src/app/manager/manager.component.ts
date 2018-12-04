import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManagerService } from './manager.service'
import { AuthService } from '../services/auth.service';
import { Manager } from '../models/manager.model';

@Component(
    {
        selector: 'app-manager',
        templateUrl: './manager.component.html',
        styleUrls: ['./manager.component.css']
    }
)
export class ManagerComponent implements OnInit 
{
    private manager: Manager;

    constructor(
        private authService: AuthService,
        private router: Router 
    ) { }

    ngOnInit() 
    {
        this.manager = this.authService.getManager();
        console.log(this.manager); 
    }
}
