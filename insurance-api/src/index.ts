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
// import { validate } from 'json-schema';

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

    const offer = req.body;
    const renderedHtml = pug.renderFile('src/views/offerPdf.pug', { offer: offer });

    res.setHeader('Content-type', 'application/pdf');

    pdf.create(renderedHtml).toStream(function(err: any, stream: any){
        console.log(err);
        stream.pipe(res);
    });
});

app.use(function(err: any, req: any, res: any, next: any) {
 
    if (err.name === 'JsonSchemaValidation') {
        if (req.get('Content-Type') === 'application/json') {
            res.status(400).json({ error: 'Invalid input content. JsonSchemaValidation failed.' });
        } else {
            res.status(400).json({ error: 'Invalid content-type in input. JsonSchemaValidation failed.' });
        }
    } else {
        next(err);  // pass error to next error middleware handler
    }
});

const main = () => app.listen(port, () => console.log('Api is running.'));

main();
