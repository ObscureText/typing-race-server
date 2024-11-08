require('dotenv').config();
const express = require('express');
const cors = require('cors')
const http = require('http');
const startSocket = require('./socket/socket');
const router = require('./routes/routes');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// app.use('', router);

// connectDB();
startSocket(server);

app.get('/', (_, res) => res.send('Server running ...'))

const PORT = process.env.PORT || 5500;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server started on PORT ${PORT}`);
});