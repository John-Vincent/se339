import { Chart } from "./chart.model"

export class Manager 
{
    constructor(username: String, password: String)
    {
        this.username = username;
        this.password = password;
    }

    username: String;
    password: String;
    name: String;
    vehicles: Array<number>;
    charts: Array<Chart>;
}