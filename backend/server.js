import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Assuming this file exists and exports connectDB
import cors from 'cors';

// Corrected import: Based on the provided articleRoutes.js, it uses 'export default router;'
// Therefore, we import it as a default export (e.g., 'articleRoutes').
import articleRoutes from './routes/articleRoutes.js';

dotenv.config();
// Call your database connection function
// Ensure connectDB correctly handles the MONGODB_URI from process.env
connectDB();

const app = express();

// Configure CORS to allow requests from your frontend
// Ensure process.env.CLIENT_URL is set on Render if you're using a specific origin
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
// Enable parsing of JSON request bodies
app.use(express.json());

// Use the imported router for API routes
app.use('/api', articleRoutes); // Use articleRoutes directly as it's the default export

const PORT = process.env.PORT || 5000; // Use Render's PORT env var, or default to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
