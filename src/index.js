// Main JS file
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import itemRouter from './routes/item-router.mjs';
import userRouter from './routes/user-router.mjs';
import entryRouter from './routes/entry-router.mjs';
import cors from 'cors';
const hostname = '127.0.0.1';
const port = 3000;
const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/entries', entryRouter);

// Staattinen sivusto palvelimen juureen (public-kansion sisältö näkyy osoitteessa http://127.0.0.1:3000/sivu.html)
app.use(express.static('public'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Staattinen sivusto "ali-url-osoitteessa": http://127.0.0.1:3000/sivusto
// Tarjoiltava kansio määritellään relatiivisella polulla
app.use('/sivusto', express.static(path.join(__dirname, '../public')));

//resource item endpoints
app.use('/items', itemRouter);

// users resource
app.use('/users', userRouter);


// GET http://127.0.0.1:3000
// ei toimi tällä hetkellä, koska public-server tarjoilee index.html:n ensin
app.get('/', (req, res) => {
  res.send('Welcome to my REST api!');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});