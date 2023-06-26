import express from 'express';
import indexRouter from './routes/index.routes'
import productRouter from './routes/products.routes'
import categoryRouter from './routes/categorys.routes'
import {createRoles, createCategorys} from './libs/initSetup'
import authRouter from './routes/auth.routes'
import morgan from 'morgan';
import pkg from '../package.json'

const app = express();
createRoles();
createCategorys();

app.set('pkg',pkg)

app.use(express.json());

app.use(morgan('dev'));

app.use(indexRouter);
app.use(authRouter)
app.use('/products',productRouter)
app.use('/categorys',categoryRouter)

export default app;
