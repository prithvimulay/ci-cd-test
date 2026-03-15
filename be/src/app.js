const express = require('express');
const cors = require('cors');
const ipRoutes = require('./routes/ipRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Server UP', timestamp: new Date() });
});

app.use('/api', ipRoutes);

module.exports = app;