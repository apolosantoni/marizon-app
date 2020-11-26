import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './Routers/userRouter.js';
import productRouter from './Routers/productRouter.js';
import orderRouter from './Routers/orderRouter.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/marizon-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

/*
// use to local file data.js
app.get('/api/products', (req, res) => {
    res.send(data.products);
});
*/

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter)
app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server at http://localhost:${port}`);
});