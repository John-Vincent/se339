import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'client';

    constructor(
        private router: Router,
        private auth: AuthService
    ){}

    public logout()
    {
        this.auth.logout();
        this.router.navigateByUrl('/login');
    }

    public vehicleList()
    {
        this.router.navigateByUrl('/vehicle');
    }

    public dashboard()
    {
        this.router.navigateByUrl('/dashboard');
    }
}
