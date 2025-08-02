// app.js (ESM)
import 'dotenv/config'; // Modern way to load dotenv in ESM
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import articleRoutes from './routes/articleRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import authRoutes from './routes/authRoutes.js';
import configurePassport from './config/passport.js'; // Import the function
import cors from 'cors'
const app = express();
const PORT = process.env.PORT || 10000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// CORS Setup
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true); // Allow non-browser requests

        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:10000',
            'https://trendwise-beta.vercel.app',
            'https://trendwise-p440.onrender.com'
        ];

        if (allowedOrigins.some(o => origin.startsWith(o))) {
            return callback(null, true);
        }

        console.error('Blocked by CORS:', origin);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));


app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.use(passport.initialize());
app.use(passport.session());

// Configure Passport
configurePassport(passport);

// Routes
app.use('/api', articleRoutes);
app.use('/api', commentRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Article API!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});