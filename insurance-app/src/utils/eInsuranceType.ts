enum EInsuranceType {
    PZP = 'PZP',
    AccidentInsurance = 'AccidentInsurance'
}

export const insuranceTypeString = {
    [EInsuranceType.PZP]: 'PZP',
    [EInsuranceType.AccidentInsurance]: 'Havarijné poistenie'
};

export default EInsuranceType;