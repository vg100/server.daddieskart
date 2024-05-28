"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require('http');
const socketio = require('socket.io');
let product = {
    name: "Sample Product",
    price: 100
};
class SocketManager {
    static initSocket(app) {
        SocketManager.server = http.createServer(app);
        SocketManager.io = socketio(SocketManager.server);
        SocketManager.initializeWebSocket();
        return SocketManager.server;
    }
    static initializeWebSocket() {
        SocketManager.io.on('connection', (socket) => {
            console.log('Socket connected:', socket.id);
            // Receive offer from client
            socket.on('sendOffer', (offer) => {
                // Validate offer
                if (offer.amount < product.price) {
                    // Update product price
                    product.price = offer.amount;
                    // Broadcast updated product price to all clients in the room
                    SocketManager.io.to(offer.room).emit('productPriceUpdate', product.price);
                    // Notify client that offer was accepted
                    socket.emit('offerAccepted', product.price);
                }
                else {
                    // Notify client that offer was rejected
                    socket.emit('offerRejected', product.price);
                }
            });
            socket.on('disconnect', () => {
                console.log('Socket disconnected:', socket.id);
            });
        });
    }
}
exports.default = SocketManager;
