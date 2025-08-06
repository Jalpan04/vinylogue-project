const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

console.log('Starting server initialization...');

// Load environment variables
dotenv.config();
console.log('Environment variables loaded.');

// Connect to Database
console.log('Attempting to connect to database...');
connectDB();

const app = express();
console.log('Express app created.');

// Middleware
app.use(cors());
app.use(express.json());
console.log('Middleware configured.');

// API Routes
console.log('Configuring API routes...');
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/spotify', require('./routes/spotifyRoutes'));
console.log('API routes configured.');

// This is the port Render provides. It's crucial for deployment.
const PORT = process.env.PORT || 5001;
console.log(`Port configured to: ${PORT}`);

app.listen(PORT, () => console.log(`🚀 Server is successfully running and listening on port ${PORT}`));