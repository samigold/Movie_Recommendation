// import { createClient } from 'redis';
const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();

// Create Redis client
const client = redis.createClient({
    username: 'default',
    password: process.env.Redis_Password,
    socket: {
        host: process.env.Redis_Uri,
        port: process.env.Redis_Port
    }
});

client.on('error', err => console.log('Redis Client Error', err));

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('ready', () => {
    console.log('Redis client ready');
});

// Connect to Redis
async function connectRedis() {
    try {
        await client.connect();
        console.log('Redis connected successfully');
        
        // Test connection
        await client.set('test', 'connection');
        const result = await client.get('test');
        console.log('Redis test result:', result); // >>> connection
        await client.del('test'); // Clean up test key
    } catch (error) {
        console.error('Failed to connect to Redis:', error);
    }
}

// Export both the client and connect function
module.exports = client;
module.exports.connectRedis = connectRedis;