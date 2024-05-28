"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const mongoose = require("mongoose");
const mysql = require("mysql");
const productRouter_1 = require("./Routers/productRouter");
const userRouter_1 = require("./Routers/userRouter");
const orderRouter_1 = require("./Routers/orderRouter");
const categoryRouter_1 = require("./Routers/categoryRouter");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cartRouter_1 = require("./Routers/cartRouter");
const path = require("path");
const reviewRouter_1 = require("./Routers/reviewRouter");
const transactionRouter_1 = require("./Routers/transactionRouter");
const appRouter_1 = require("./Routers/appRouter");
const featuresRouter_1 = require("./Routers/featuresRouter");
const awsServices_1 = require("./Utils/awsServices");
const twilioServices_1 = require("./Utils/twilioServices");
const sellerRouter_1 = require("./Routers/sellerRouter");
const couponRouter_1 = require("./Routers/couponRouter");
const socketIO = require("socket.io");
const winston_1 = require("winston");
const adminRouter_1 = require("./Routers/adminRouter");
const expressSwagger = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const offerRouter_1 = require("./Routers/offerRouter");
const client_1 = require("@prisma/client");
const web3Router_1 = require("./Routers/web3Router");
const env_1 = require("./environments/env");
require('aws-sdk/lib/maintenance_mode_message').suppress = true;
class Server {
    constructor() {
        this.app = express();
        this.prisma = new client_1.PrismaClient();
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
            apis: ['./Routers/**/*.ts'],
        };
        const swaggerSpec = swaggerJsdoc(options);
        this.app.use('/api-docs', expressSwagger.serve, expressSwagger.setup(swaggerSpec));
    }
    createLogger() {
        return winston_1.createLogger({
            level: 'error',
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.errors({ stack: true }), winston_1.format.json()),
            transports: [
                new winston_1.transports.File({
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
        this.connectToS3Bucket();
        this.connectToTwilio();
    }
    connectPrisma() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prisma.$connect();
                console.log('Prisma connected successfully!');
            }
            catch (error) {
                console.error('Error connecting to Prisma:', error);
            }
        });
    }
    connectsqlDB() {
        mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
        }).connect((err) => {
            console.log('mysql connected successfully', err);
        });
    }
    connectToS3Bucket() {
        return __awaiter(this, void 0, void 0, function* () {
            yield awsServices_1.default.checkConnection();
        });
    }
    connectToTwilio() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield twilioServices_1.default.checkConnectivity();
                console.log(result);
            }
            catch (error) {
                console.error('Twilio connectivity check failed:', error);
            }
        });
    }
    connectMongoDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = env_1.getEnvironmentVariables().db_url;
                yield mongoose.connect(uri);
                console.log("successfully connected to MongoDB!");
            }
            catch (error) {
                console.log(error, 'error');
            }
        });
    }
    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(express.json());
        this.app.use(morgan('tiny'));
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
        this.app.use('/', appRouter_1.default);
        this.app.use('/api/v1/users', userRouter_1.default);
        this.app.use('/api/v1/categories', categoryRouter_1.default);
        this.app.use('/api/v1/features', featuresRouter_1.default);
        this.app.use('/api/v1/cart', cartRouter_1.default);
        this.app.use('/api/v1/products', productRouter_1.default);
        this.app.use('/api/v1/orders', orderRouter_1.default);
        this.app.use('/api/v1/reviews', reviewRouter_1.default);
        this.app.use('/api/v1/transaction', transactionRouter_1.default);
        this.app.use('/api/v1/seller', sellerRouter_1.default);
        this.app.use('/api/v1/admin', adminRouter_1.default);
        this.app.use('/api/v1/coupon', couponRouter_1.default);
        this.app.use('/api/v1/offer', offerRouter_1.default);
        this.app.use('/api/v1/web3', web3Router_1.default);
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            let errorStatus = req.errorStatus || 500;
            let errorObject = {
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
            });
        });
    }
}
exports.Server = Server;
