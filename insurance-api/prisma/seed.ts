import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import csv from 'csv-parser';

const prisma = new PrismaClient();

/** 
 * @param n max number (excluded).
 * @returns random int from 0 (including) to n (excluding).
 */
const randomNum = (n=10) => Math.floor(Math.random() * n);

/**
 * @returns random capitalized character.
 */
const randomChar = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPRSTQVWUXYZ';

  return alphabet[randomNum(alphabet.length)];
}

/**
 * @returns random slovak spz. 
 */
const randomSpz = () => {
  const cities = ['BA', 'BB', 'KM', 'MT', 'ZA'];

  return cities[randomNum(cities.length)] + randomNum() + randomNum() + randomNum() + randomChar() + randomChar();
};

/**
 * @returns list of cars.
 */
const loadCars = () => new Promise((resolve) => {
  const cars : any[] = [];

  fs.createReadStream('./data/data.csv')
    .pipe(csv())
    .on('data', (row) => {
      cars.push({
        name: row.name,
        engineDisplcementMl: +row.displacement,
        powerKw: +row.power,
        marketPriceEur: +row.price,
        madeAt: new Date(row.date)
      })
    })
    .on('end', () => {
      resolve(cars);
    });
});

const main = async () => {
  const cars: any = await loadCars();

  await prisma.car.createMany({ data: cars });

  const spzs = Array.from(Array(100).keys(), () => randomSpz());
  
  const uniqueSpzs = [...new Set(spzs)]

  await prisma.registrations.createMany({
    data: uniqueSpzs.map(spz => ({ SPZ: spz, carId: randomNum(100) + 1 }))
  });

  console.log('Generated spzs:')
  console.log(uniqueSpzs)
};

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())