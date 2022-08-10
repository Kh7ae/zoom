import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on https://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    console.log("Connected to Browser ✅")
    socket.on("close", () => console.log("Disconnected from the Browser ❌"));
    socket.on("message", (message) => {
        sockets.forEach((aSocket) => aSocket.send(message.toString('utf8')));
    });
    // https://velog.io/@plate0113/JS-Buffer-68-65-6c-6c-6f-20-66-72-6f-6d-20-74-68-65-20-62-72-6f-77-73-65-72-73-%ED%98%84%EC%83%81-%ED%95%B4%EA%B2%B0-%EB%B0%A9%EB%B2%95
    // utf8로 변환하지 않고 그냥 message를 받았더니 이상한 Buffer 어쩌고를 받았다 ..
});

server.listen(3000, handleListen);