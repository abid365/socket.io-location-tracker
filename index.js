const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,
    {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            transports: ['websocket', 'polling'],
            credentials: true
        },
        allowEIO3: true
    }
);
const path = require("path");


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'public'))
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
    res.render('index', { title: 'Welcome', message: 'hello world' })

})

io.on('connection', (socket) => {
    console.log(`A user is connected ${socket.id}`)
    socket.on('chat message', (msg) => {
        console.log('message:', msg)
        io.emit('chat message', msg);
    })
    socket.on('location', (loc) => {
        console.log(loc);
        io.emit('location', loc);
    })
})

server.listen(3000, () => {
    console.log(`Server is runnnng at 3000`)
})