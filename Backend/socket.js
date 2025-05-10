const socketIo = require("socket.io");
const userModel = require("./models/user.model")
const captainModel = require("./models/captain.model")

let io;

function initalizeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`New client connected ${socket.id}`);

        socket.on("join", async (data) => {
             const { userId, userType } = data;

             console.log(`User joined: ${userId}, Type: ${userType}`);
             

             if(userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
             } else if(userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
             }
        });

        socket.on('update-location-captain', async (data) => {
            const { userId, ltd, lng } = data;

            if (!userId || !ltd || !lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }

            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: ltd,
                    lng: lng
                }
            });
        });
        

        socket.on("disconnect", () => {
            console.log(`Client disconnected ${socket.id}`);
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {

    console.log(messageObject);
    
        if (io) {
            io.to(socketId).emit(messageObject.event, messageObject.data);
        } else {
            console.log('Socket.io not initialized.');
        }
    }

module.exports = {initalizeSocket, sendMessageToSocketId}