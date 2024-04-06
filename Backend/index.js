import express from 'express';
import { PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import booksRoutes from './routes/bookRoutes.js';
import cors from 'cors';

const app = express();

//middleware for parshing request body
app.use(express.json());

//Middleware for handling CORS policy
//option 1: Allow all cors(*)
app.use(cors())
// option 2: allow custom origin
// app.use(
//     cors({
//         origin: ['http://localhost:3000', 'http://localhost:3001'],
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['content-type']
//     })
// ) 
app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Welcome to Express server')
})

app.use('/books', booksRoutes);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT , () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })