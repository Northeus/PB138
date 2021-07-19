interface IVehicleParameters {
    licensePlate: string | undefined;

    cylinderVolume: number;
    enginePower: number;
    price: number;
    creationDate: Date;
}

export default IVehicleParameters;