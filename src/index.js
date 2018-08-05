import express from 'express';

// API Modules
import health from 'Modules/health';

const app = express();

// Load API Modules
app.use(health.prefix, health.routes);

// Start App
app.listen(process.env.SERVER_PORT, () => {
    console.log(`${process.env.APP_NAME} listening on port http://0.0.0.0:${process.env.SERVER_PORT}`);
});
