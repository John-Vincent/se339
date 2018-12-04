import { Chart } from "./chart.model"

export class Manager {
    username: string;
    password: string;
    name: string;
    vehicles: Array<number>;
    charts: Array<Chart>;
}