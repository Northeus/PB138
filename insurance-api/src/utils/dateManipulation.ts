export const getNYearsBefore = (date: Date, n: number): Date => {
    const dateCopy = new Date(date);
    dateCopy.setFullYear(dateCopy.getFullYear() - n);
    if (date.getMonth() == 2
        && date.getDate() == 29
        && dateCopy.getMonth() == 3
        && dateCopy.getDate() == 1) {
        dateCopy.setMonth(2);
        dateCopy.setDate(28);
    }
    return dateCopy;
};

export const getNYearsAfter = (date: Date, n: number): Date => {
    const dateCopy = new Date(date);
    dateCopy.setFullYear(dateCopy.getFullYear() + n);
    return dateCopy;
};