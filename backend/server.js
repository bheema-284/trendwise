import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import articleRoutes from './routes/articleRoutes.js';

dotenv.config();
connectDB();

const app = express();

// Recommended: Relax CORS for now (during dev)
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());

app.use('/api', articleRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
