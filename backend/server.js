import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import articleRoutes from './routes/articleRoutes.js';

dotenv.config();

connectDB().catch(err => {
    console.error('DB Connection Failed:', err);
});

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'https://trendwise-beta.vercel.app',
    'https://your-frontend-app.onrender.com'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Render!');
});

app.use('/api', articleRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
