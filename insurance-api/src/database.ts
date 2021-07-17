import { Car, Offer, PrismaClient } from '@prisma/client';
import offer from './models/offer';

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

export const createOffer = async (offer: offer): Promise<Offer> => {
    return (
        await prisma.offer.create({
            data: offer
        })
    );
};

export const getOffer = async (offerId: string): Promise<Offer | null>  => {
    return (
        await prisma.offer.findFirst({
            where: {
                id: offerId
            }
        })
    );
};
