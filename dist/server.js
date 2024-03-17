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
const bodyParser = require("body-parser");
const cartRouter_1 = require("./Routers/cartRouter");
const path = require("path");
const reviewRouter_1 = require("./Routers/reviewRouter");
const transactionRouter_1 = require("./Routers/transactionRouter");
const appRouter_1 = require("./Routers/appRouter");
class Server {
    constructor() {
        this.app = express();
        this.setConfiguration();
        this.setRouter();
        this.error404Handler();
        this.handleErrors();
    }
    setConfiguration() {
        this.configureBodyParser();
        // this.connectsqlDB();
        this.connectMongoDB();
        // this.handlebarsTemplate();
        // this.setSession();
        // this.connectToFlash();
        this.enableCors();
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
    connectMongoDB() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = "mongodb+srv://vg100:vg100@cluster0.bszog.mongodb.net/test";
                mongoose.connect(uri, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });
                console.log("You successfully connected to MongoDB!");
            }
            finally {
                //   await client.close();
            }
        });
    }
    //get data in json format from the user
    configureBodyParser() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(express.json());
        // this.app.use(morgan('tiny'))
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
    setRouter() {
        this.app.use('/', appRouter_1.default);
        this.app.use('/api/v1/users', userRouter_1.default);
        this.app.use('/api/v1/categories', categoryRouter_1.default);
        this.app.use('/api/v1/cart', cartRouter_1.default);
        this.app.use('/api/v1/products', productRouter_1.default);
        this.app.use('/api/v1/orders', orderRouter_1.default);
        this.app.use('/api/v1/reviews', reviewRouter_1.default);
        this.app.use('/api/v1/transaction', transactionRouter_1.default);
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            let errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message,
                status_code: errorStatus
            });
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
