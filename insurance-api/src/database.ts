import { Car, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCar = async (spz: string): Promise<Car | undefined> => {
    const query = await prisma.registrations.findFirst({
        where: {
            SPZ: spz
        },
        select: {
            car: true
        }
    });

    return query?.car;
};