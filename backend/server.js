import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import userRouter from './Routers/userRouter.js';

const app = express();
mongoose.connect('mongodb://localhost/marizon-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find( x => x._id === req.params.id);
    if (product){
        res.send(product);
    }else{
        res.status(404).send({message: 'Product not Found'})
    }
});

app.get('/api/products',(req, res) => {
    res.send(data.products);
});

app.use('/api/users', userRouter)
app.get('/',(req, res) => {
    res.send('Server is ready');
});

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server at http://localhost:${port}`);
});