import express from 'express';
import productRoutes from './routes/productRoutes.js';
import dotenv from 'dotenv';
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import superAdminRoutes from './routes/superAdminRoutes.js'
import formRoutes from './routes/formRoutes.js';
import addressRoutes from './routes/addressRoutes.js';

dotenv.config();
const app = express();

const allowedOrigins = ['https://xceedfrontendd.vercel.app', 'http://localhost:5173', 'https://xceedinventoryfrontend.vercel.app', 'https://xceedelectronics.com', 'https://inventory.xceedelectronics.com'];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());
// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
}
);
app.use('/api/products', productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/admin', superAdminRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/addresses', addressRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));