import express from 'express';

import { router } from './routes';

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());

app.get('/', (request, response) => response.send('Its working'));

app.use(router);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
