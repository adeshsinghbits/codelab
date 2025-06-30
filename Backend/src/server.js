import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import { app } from "./app.js";
import { Server } from "socket.io";
dotenv.config();

const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    console.log("Database connected");
    const server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });

    const io = new Server(server, {
      pingTimeout: 60000,
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log("Connected to socket");

      socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
      });

      socket.on("join chat", (roomId) => {
        console.log("Joining chat:", roomId);
        socket.join(roomId);
      });

      socket.on("new message", async (newMessage) => {
        try {
          console.log("Received new message:", newMessage.chatId);
          
          io.to(newMessage.chatId._id).emit("message recieved", newMessage);
          console.log("Broadcasted message to chat room:", newMessage.chatId);
        } catch (error) {
          console.error("Error handling new message:", error);
        }
      });

      socket.off("setup", () => {
        console.log("Disconnected from socket");
        socket.leave(userData._id);
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });
