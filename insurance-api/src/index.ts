import express from 'express';
import cors from 'cors';
import { getCar } from './database';
import createResponse from './utils/response';
import { carNotFound } from './utils/errorMessages';
import pdf from 'html-pdf';
import pug from 'pug';
import { includeVehicleTypeUtilisation, includeEngineSpecs, evaluateVehicle, includeAge, includeDriversLicense, includeAccident, includeInsuranceType } from './offerCalculations';
import { validateInputOffer, validateInputPdf } from './inputValidation/attributesValidation';
import { OfferInputSchema, PdfInputSchema } from './inputValidation/jsonSchemaValidation';
import { vehicleTypeString } from './utils/eVehicleType';
import { vehicleUtilisationString } from './utils/eVehicleUtilisation';
import { insuranceTypeString } from './utils/eInsuranceType';

const port = 3001;
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

app.post('/api/offer', validate({body: OfferInputSchema}), validateInputOffer, (req, res) => {
    
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

    res.json({ price: Math.round(priceResult * 100) / 100 });
});

app.post('/api/test-pdf', validate({body: PdfInputSchema}), validateInputPdf, (req, res) => {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        return date.getDate() + '. ' + (date.getMonth() + 1) + '. ' + date.getFullYear();
    };

    const offer = req.body;
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
