import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@ng-tickets/common';
import { createChargeRouter } from './routes/new';
// import { getTicketRouter } from './routes/show';
// import { getTicketsRouter } from './routes/index';
// import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    }),
);
app.use(currentUser);

app.use(createChargeRouter);
// app.use(getTicketRouter);
// app.use(getTicketsRouter);
// app.use(updateTicketRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
