const express = require('express');
const fs = require('fs');
const path = require('path');
const movieRoutes = require('./routes/movieRoutes');
const { connectRedis } = require('./config/redis');

const app = express();
const PORT = 3000;


app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')))

// Connect to Redis
connectRedis();

app.use('/api/movies', movieRoutes);
app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
