import * as express from 'express'
import * as mongoose from 'mongoose';
import * as mysql from 'mysql';
import productRouter from './Routers/productRouter';
import userRouter from './Routers/userRouter';
import orderRouter from './Routers/orderRouter';
import categoryRouter from './Routers/categoryRouter';
import * as cors from 'cors';
import * as morgan from 'morgan'
import * as bodyParser from 'body-parser'
import cartRouter from './Routers/cartRouter';
import * as path from 'path'
import reviewRouter from './Routers/reviewRouter';
import transactionRouter from './Routers/transactionRouter';
import appRouter from './Routers/appRouter';
import featuresRouter from './Routers/featuresRouter';
import awsServices from './Utils/awsServices';
import TwilioServer from './Utils/twilioServices';
import sellerRouter from './Routers/sellerRouter';
import couponRouter from './Routers/couponRouter';
import * as http from 'http'
const socketIO = require("socket.io");
import { createLogger, transports, format } from 'winston';
import adminRouter from './Routers/adminRouter';
import * as expressSwagger from 'swagger-ui-express';
import * as swaggerJsdoc from 'swagger-jsdoc';
import offerRouter from './Routers/offerRouter';
import { PrismaClient } from '@prisma/client';
import web3Router from './Routers/web3Router';
import { getEnvironmentVariables } from './environments/env';

require('aws-sdk/lib/maintenance_mode_message').suppress = true;
export class Server {
    logger
    app: express.Application = express();
    prisma: PrismaClient = new PrismaClient();
    constructor() {
        this.logger = this.createLogger();
        this.setConfiguration();
        this.generateSwaggerDocumentation();
        this.setRouter();
        this.error404Handler();
        this.handleErrors();

    }

    generateSwaggerDocumentation() {
        const options = {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'Your API Documentation',
                    version: '1.0.0',
                    description: 'API documentation for your Node.js application',
                },
                basePath: '/',
            },
            apis: ['./Routers/**/*.ts'], // Path to the route files
        };

        const swaggerSpec = swaggerJsdoc(options);
        this.app.use('/api-docs', expressSwagger.serve, expressSwagger.setup(swaggerSpec));
    }




    createLogger() {
        return createLogger({
            level: 'error',
            format: format.combine(
                format.timestamp(),
                format.errors({ stack: true }),
                format.json()
            ),
            transports: [
                new transports.File({
                    filename: 'logs/error.log',
                    level: "error"
                }),
            ]
        });
    }

    setConfiguration() {
        this.configureBodyParser();
        // this.connectsqlDB();
        this.connectPrisma();
        this.connectMongoDB();
        // this.handlebarsTemplate();
        this.enableCors();
        this.connectToS3Bucket()
        this.connectToTwilio()
    }

    async connectPrisma() {
        try {
            await this.prisma.$connect();
            console.log('Prisma connected successfully!');
        } catch (error) {
            console.error('Error connecting to Prisma:', error);
        }
    }

    connectsqlDB() {
        mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',

        }).connect((err) => {
            console.log('mysql connected successfully', err)
        });

    }

    async connectToS3Bucket() {
        await awsServices.checkConnection()
    }

    async connectToTwilio() {
        try {
            const result = await TwilioServer.checkConnectivity();
            console.log(result);
        } catch (error) {
            console.error('Twilio connectivity check failed:', error);
        }
    }

    async connectMongoDB() {

        try {
            const uri = getEnvironmentVariables().db_url
            await mongoose.connect(uri);
            console.log("successfully connected to MongoDB!");
        } catch (error) {
            console.log(error, 'error');
        }

    }


    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(bodyParser.json())
        this.app.use(express.json())
        this.app.use(morgan('tiny'))
    }

    enableCors() {
        this.app.use(cors({
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: ["http://localhost:5173", "http://daddieskart.com"],
            preflightContinue: false
        }));
    }

    handlebarsTemplate() {
        this.app.use(express.static(path.join(__dirname, "../public")));
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'hbs');
    }


    setRouter() {

        this.app.use('/', appRouter);
        this.app.use('/api/v1/users', userRouter);
        this.app.use('/api/v1/categories', categoryRouter);
        this.app.use('/api/v1/features', featuresRouter);
        this.app.use('/api/v1/cart', cartRouter);
        this.app.use('/api/v1/products', productRouter);
        this.app.use('/api/v1/orders', orderRouter);
        this.app.use('/api/v1/reviews', reviewRouter);
        this.app.use('/api/v1/transaction', transactionRouter);
        this.app.use('/api/v1/seller', sellerRouter);
        this.app.use('/api/v1/admin', adminRouter);
        this.app.use('/api/v1/coupon', couponRouter);
        this.app.use('/api/v1/offer', offerRouter);
        this.app.use('/api/v1/web3', web3Router);
    }


    handleErrors() {
        this.app.use((error: any, req: any, res: any, next: any): void => {
            let errorStatus = req.errorStatus || 500;
            let errorObject: any = {
                message: error.message,
                status_code: errorStatus
            };
    
            // Handling Mongoose validation errors
            if (error instanceof mongoose.Error.ValidationError) {
                errorStatus = 422;
                const validationErrors = {};
                for (const field in error.errors) {
                    validationErrors[field] = error.errors[field].message;
                }
                errorObject = {
                    message: 'Validation Error',
                    errors: validationErrors,
                    status_code: errorStatus
                };
            }
    
            if (process.env.NODE_ENV === 'production' && errorStatus >= 500) {
                this.logger.error(error.message, {
                    error: error.message,
                    stack: error.stack,
                    request: {
                        method: req.method,
                        url: req.originalUrl,
                        body: req.body,
                        query: req.query,
                        params: req.params
                    }
                });
            }
    
            console.log(errorObject);
            res.status(errorStatus).json(errorObject);
        });
    }
    

    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Not Found',
                status_code: 404,
            })
        });
    }


}
