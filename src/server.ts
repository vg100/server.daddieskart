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

require('aws-sdk/lib/maintenance_mode_message').suppress = true;
export class Server {
    logger
    app: express.Application = express();
    server = http.createServer(this.app);
    io = socketIO(this.server);
    constructor() {
        this.logger = this.createLogger();
        this.setConfiguration();
        this.setRouter();
        this.error404Handler();
        this.handleErrors();
    }
    createLogger() {
        return createLogger({
            level: 'info',
            format: format.combine(
                format.timestamp(),
                format.json()
            ),
            transports: [
                new transports.File({ filename: 'combined.log' }),
                // new transports.Console()
            ]
        });
    }

    setConfiguration() {
        this.configureBodyParser();
        // this.connectsqlDB();
        this.connectMongoDB();
        // this.handlebarsTemplate();
        this.enableCors();
        this.connectToS3Bucket()
        this.connectToTwilio()
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
            const uri = "mongodb+srv://vg100:vg100@cluster0.bszog.mongodb.net/test"
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
            origin: '*',
            preflightContinue: false
        }));
    }

    handlebarsTemplate() {
        this.app.use(express.static(path.join(__dirname, "../public")));
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'hbs');
    }

    configureSocketIO() {
        this.io.on("connection", (socket) => {
            console.log("A user connected");


            socket.on("disconnect", () => {
                console.log("User disconnected");
            });
        });
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
    }


    handleErrors() {
        this.app.use((error: any, req: any, res: any, next: any): void => {
            let errorStatus = req.errorStatus || 500
            if (errorStatus >= 500) {
                this.logger.error({
                    message: 'An error occurred',
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
            res.status(errorStatus).json({
                message: error.message,
                status_code: errorStatus
            })
        })

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


