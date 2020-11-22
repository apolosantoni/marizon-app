import express from 'express';
import mongoose from 'mongoose';
import userRouter from './Routers/userRouter.js';
import productRouter from './Routers/productRouter.js';

const app = express();
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