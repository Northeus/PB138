import express from 'express';
import cors from 'cors';
import { getCar } from './database';
import createResponse from './utils/response';
import { carNotFound } from './utils/errorMessages';

const port = 3000;
const app = express();

app.use(cors());

app.use(express.json());


app.get('/vehicle/:spz', async (req, res) => {
    const vehicle = await getCar(req.params.spz);

    if (!vehicle) {
        res.status(404)
            .send(createResponse({}, carNotFound));

        return;
    }

    res.send(createResponse(vehicle));
});

const main = () => app.listen(port, () => console.log('Api is running.'));

main();
