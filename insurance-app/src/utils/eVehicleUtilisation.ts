enum EVehicleUtilisation {
    Normal = 'Normal',
    Taxi = 'Taxi',
    Rent = 'Rent',
    Vip = 'Vip',
    Dangerous = 'Dangerous'
}

export const vehicleUtilisationString = {
    [EVehicleUtilisation.Normal]: 'Bežné použitie',
    [EVehicleUtilisation.Taxi]: 'Taxi',
    [EVehicleUtilisation.Rent]: 'Vozidlo pre požičovňu',
    [EVehicleUtilisation.Vip]: 'Vozidlo s právom prednostnej jazdy',
    [EVehicleUtilisation.Dangerous]: 'Vozidlo na prepravu nebezpečných vecí'
};

export default EVehicleUtilisation;