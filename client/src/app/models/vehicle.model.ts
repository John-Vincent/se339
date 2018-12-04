export class Vehicle
{
    public vid: Number;
    public mrLat: Number;
    public mrLong: Number;
    public mrSpeed: Number;
    public mrGas: Number;
    public mrDid: Number;
    public mrEngineTemp: Number;
    public mrEngineLoad: Number;
    public msg: String;
    public bitrate: Number;
    public gasTankSize: Number;
    public data: VehicleData[]
}

export class VehicleData {
    public latitude: Number;
    public longitue: Number;
    public speed: Number;
    public gas: Number;
    public did: Number;
    public engineTemp: Number;
    public engineLoad: Number;
}