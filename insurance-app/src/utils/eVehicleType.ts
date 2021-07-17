enum EVehicleType {
    Car = 'Car',
    UpTo35Ton = 'UpTo35Ton',
    Motorcycle = 'Motorcycle',
    FourWheeler = 'FourWheeler'
}

export const vehicleTypeString = {
    [EVehicleType.Car]: 'Osobný automobil',
    [EVehicleType.UpTo35Ton]: 'Úžitkové vozidlo do 3.5t',
    [EVehicleType.Motorcycle]: 'Motorka',
    [EVehicleType.FourWheeler]: 'Štvorkolka'
};

export default EVehicleType;