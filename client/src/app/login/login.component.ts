import { Component, OnInit, ViewChild } from '@angular/core';
import { Manager } from '../models/manger.model';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {  
    @ViewChild('username')
    private username;

    @ViewChild('password')
    private password;

    constructor() { }

    ngOnInit() {
    }

    submit() {
      console.log(this.username.nativeElement.value);
      console.log(this.password.nativeElement.value);
    }
}
