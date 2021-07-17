import express, { response } from 'express';
import cors from 'cors';
import { getCar, createOffer, getOffer } from './database';
import createResponse from './utils/response';
import { carNotFound, offerNotFound, prismaError } from './utils/errorMessages';
import pdf from 'html-pdf';
import pug from 'pug';
import { includeVehicleTypeUtilisation, includeEngineSpecs, evaluateVehicle, includeAge, includeDriversLicense, includeAccident, includeInsuranceType } from './offerCalculations';
import { validateInputOffer } from './inputValidation/attributesValidation';
import { OfferInputSchema } from './inputValidation/jsonSchemaValidation';
import { vehicleTypeString } from './utils/eVehicleType';
import { vehicleUtilisationString } from './utils/eVehicleUtilisation';
import { insuranceTypeString } from './utils/eInsuranceType';

// Todo make better noncoliding port
const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

const validate = require('express-jsonschema').validate;

app.get('/vehicle/:spz', async (req, res) => {
    const vehicle = await getCar(req.params.spz);

    if (!vehicle) {
        res.status(404)
            .send(createResponse({}, carNotFound));

        return;
    }

    res.send(createResponse(vehicle));
});

app.post('/api/offer', validate({body: OfferInputSchema}), validateInputOffer, async (req, res) => {
    
    const resultMultiplicationFunctions = [
        includeVehicleTypeUtilisation,
        includeEngineSpecs,
        evaluateVehicle,
        includeAge,
        includeDriversLicense,
        includeAccident
    ];

    const priceResult = includeInsuranceType(req);
    const multiplayer = resultMultiplicationFunctions
        .map(evaluationMultiplayer => evaluationMultiplayer(req))
        .reduce((acc, curr) => acc * curr, 1);
    

    const offerPrice = Math.round((priceResult * multiplayer) * 100) / 100;

    try {
        const offer = await createOffer(Object.assign({}, req.body, { offerPrice: offerPrice }));
        return res.send(createResponse(offer));
    } catch(error) {
        return res.status(500).send(createResponse({}, prismaError));
    }
});

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
    return date.getDate() + '. ' + (date.getMonth() + 1) + '. ' + date.getFullYear();
};

app.get('/api/offer/:offerId/pdf', async (req, res) => {
    try {
        const offer = await getOffer(req.params.offerId);
        
        if (!offer) {
            res.status(404).send(createResponse({}, offerNotFound));
            return;
        }

        const renderedHtml = pug.renderFile(
            'src/views/offerPdf.pug',
            { 
                offer: offer,
                vehicleTypeString: vehicleTypeString,
                vehicleUtilisationString: vehicleUtilisationString,
                insuranceTypeString: insuranceTypeString,
                formatDate: formatDate
            }
        );

        res.setHeader('Content-type', 'application/pdf');

        pdf.create(renderedHtml).toStream( (_error, stream) => {
            stream.pipe(res);
        });
        
        return;

    } catch(error) {
        return res.status(500).send(createResponse({}, prismaError));
    }
});

app.use((err: any, req: any, res: any, next: any) => {
    if (err.name === 'JsonSchemaValidation') {
        res.status(400).send(createResponse(
            {},
            req.get('Content-Type') === 'application/json'
                ? 'Invalid input content. JsonSchemaValidation failed.'
                : 'Invalid content-type in input. JsonSchemaValidation failed.'
        ));
    } else {
        next(err);
    }
});

const main = () => app.listen(port, () => console.log('Api is running.'));

main();
