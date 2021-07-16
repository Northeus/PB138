import express from 'express';
import cors from 'cors';
import { getCar, createOffer, getOffer } from './database';
import createResponse from './utils/response';
import { carNotFound } from './utils/errorMessages';
import pdf from 'html-pdf';
import pug from 'pug';
import { includeVehicleTypeUtilisation, includeEngineSpecs, evaluateVehicle, includeAge, includeDriversLicense, includeAccident, includeInsuranceType } from './offerCalculations';
import { validateInputOffer } from './inputValidation/attributesValidation';
import { OfferInputSchema } from './inputValidation/jsonSchemaValidation';
import { vehicleTypeString } from './utils/eVehicleType';
import { vehicleUtilisationString } from './utils/eVehicleUtilisation';
import { insuranceTypeString } from './utils/eInsuranceType';

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

    let priceResult = includeInsuranceType(req);
    resultMultiplicationFunctions.map(f => {
        priceResult *= f(req);
    });

    const price = Math.round(priceResult * 100) / 100;
    const offer = await createOffer(Object.assign({}, req.body, { offerPrice: price }));

    res.json(offer);
});

app.get('/api/offer/:offerId(\\d+)/pdf', async (req, res) => {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        return date.getDate() + '. ' + (date.getMonth() + 1) + '. ' + date.getFullYear();
    };

    console.log(parseInt(req.params.offerId));
    const offer = await getOffer(parseInt(req.params.offerId));
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
});

// <a href=${'/api/offer/' + offer.id + '/pdf'} target="_blank" class="btn ">Text tlačítka</a>

app.use((err: any, req: any, res: any, next: any) => {
 
    if (err.name === 'JsonSchemaValidation') {
        if (req.get('Content-Type') === 'application/json') {
            res.status(400).json({ error: 'Invalid input content. JsonSchemaValidation failed.' });
        } else {
            res.status(400).json({ error: 'Invalid content-type in input. JsonSchemaValidation failed.' });
        }
    } else {
        next(err);
    }
});

const main = () => app.listen(port, () => console.log('Api is running.'));

main();
