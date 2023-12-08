import express, { Express } from 'express';
import './config/database';
import dotenv from 'dotenv';
dotenv.config();
import { logger } from './logger/logger';
import { ErrorHandler, decryptData } from './middleware';
import './config/passport.jwt';
import routes from './routes/index';
import passport from 'passport';
import cors from 'cors';
import cron from 'node-cron';
import session from 'express-session';
import { END_POINTS } from './constant';
import { encriptionRoutesRoutes } from './routes/encryption/encryption.routes';
import { backupDatabase } from './utils/database.backup';

const port = process.env.PORT_SERVER || 8000;

class AppServer {
    constructor() {
        const app: Express = express();
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(
            cors({
                optionsSuccessStatus: 200,
                credentials: true,
            }),
        );
        app.use(
            session({
                secret: process.env.SESSION_SECERET,
                resave: false,
                saveUninitialized: true,
            }),
        );
        app.use(passport.initialize());
        app.use(passport.session());
        app.use(END_POINTS.ENC_DEC, encriptionRoutesRoutes);
        // app.use(decryptData);
        // cron.schedule('0 13 * * *', async () => {
        //     logger.info('Running backup...');
        //     await backupDatabase();
        //     logger.info('Backup completed.');
        // });
        app.use(END_POINTS.MAIN, routes);
        app.use(ErrorHandler);
        app.listen(port, () => {
            logger.info(`🚀 Server is listening on Port:- ${port}`);
        });
    }
}
new AppServer();
