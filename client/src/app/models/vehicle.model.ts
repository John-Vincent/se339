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

    constructor(vid: Number, gasTankSize: Number, bitrate: Number, msg: String)
    {
        this.vid = vid;
        this.gasTankSize = gasTankSize;
        this.bitrate = bitrate;
        this.msg = msg;
    }
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