import { Server } from "socket.io";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if ((res.socket as any)?.server?.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");

    const io = new Server((res.socket as any)?.server);
    (res.socket as any).server.io = io;

    io.on("connection", (socket) => {
      socket.on("join_room", (roomId) => {
        socket.join(roomId);
      });

      socket.on("post_question", (data) => {
        socket.to(data.room).emit("receive_question", data.question);
      });

      socket.on("post_answer", (data) => {
        socket.to(data.room).emit("receive_answer", data.answer);
      });

      socket.on("vote", (data) => {
        socket.to(data.room).emit("set_vote", data.vote);
      });
    });
  }

  res.end();
};

export default handler;
