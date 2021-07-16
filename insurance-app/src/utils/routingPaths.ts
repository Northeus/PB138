enum RoutingPaths {
    VehicleType = '/vehicle-type',
    VehicleUtilisation = '/vehicle-utilisation',
    VehicleParameters = '/vehicle-parameters',
    VehicleOwner = '/vehicle-owner',
    InsuranceType = '/insurance-type',
    Summary = '/summary',
    Info = '/info',
    Root = '/'
}

export const order = [
    RoutingPaths.VehicleType,
    RoutingPaths.VehicleUtilisation,
    RoutingPaths.VehicleParameters,
    RoutingPaths.VehicleOwner,
    RoutingPaths.InsuranceType,
    RoutingPaths.Summary
];

export default RoutingPaths;