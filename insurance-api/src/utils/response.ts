export interface Response<T> {
    message: string,
    data: T;
}

export const createResponse = <T>(data: T, message = 'Successful.'): Response<T> => ({ message: message, data: data });

export default createResponse;