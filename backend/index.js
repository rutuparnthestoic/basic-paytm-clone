import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());


import { router } from './routes/index.js';
//All our requests will go to router. /api/v1/{anything}
//This is useful for updates. If we have a big logic change, we can create another router /api/v2.
app.use('/api/v1', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})

export default app;