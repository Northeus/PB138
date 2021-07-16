import { Car, Offer, PrismaClient } from '@prisma/client';

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

export const createOffer = async (offer: any) => {
    return (
        await prisma.offer.create({
            data: offer
        })
    );
};

export const getOffer = async (offerId: number): Promise<Offer | null>  => {
    return await prisma.offer.findFirst({
        where: {
            id: offerId
        }
    });
};
