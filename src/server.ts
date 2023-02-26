import config from 'config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connect from './utils/connect';
// import routes from './routes';
import deserializeUser from './middleware/deserializeUser';
import productRoutes from './routes/product.route';
import userRoutes from './routes/user.route';
import sessionRoutes from './routes/session.route';
import cartRoutes from './routes/cart.route';

const app = express();
const port = config.get<number>('port');

app.use(
    cors({
        origin: config.get('origin'),
        credentials: true
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(deserializeUser);
app.use('/api/product', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/session', sessionRoutes);
app.use('/api/cart', cartRoutes);

app.listen(port, async () => {
    console.log('App is running on port ' + port);
    await connect();
});
