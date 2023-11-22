const express = require("express");

const app = express();

const dbconfig=require("./db");
const roomsRoute=require("../starlette-server/routes/roomsRoute");
const usersRoute=require("../starlette-server/routes/usersRoute");
const bookingsRoute=require("../starlette-server/routes/bookingsRoute");

app.use(express.json())


app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)
app.use('/api/bookings', bookingsRoute)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Node server started using nodemon'));
