import { Chart } from "./chart.model"

export class Manager 
{
    constructor(username: string, password: string)
    {
        this.username = username;
        this.password = password;
    }

    username: string;
    password: string;
    name: string;
    vehicles: Array<number>;
    charts: Array<Chart>;
}