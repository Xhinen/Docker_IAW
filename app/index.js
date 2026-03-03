const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// simple in-memory "catalog"
const products = [
  { id: 1, name: 'Camisa', price: 20, description: 'Camisa de algodón' },
  { id: 2, name: 'Pantalones', price: 35, description: 'Pantalones vaqueros' },
  { id: 3, name: 'Zapatos', price: 50, description: 'Zapatos de cuero' },
];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { products });
});

app.get('/product/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id, 10));
  if (!product) {
    return res.status(404).send('Producto no encontrado');
  }
  res.render('product', { product });
});

// registration page
app.get('/register', (req, res) => {
  res.render('register');
});

// handle registration submission
const users = [];
app.post('/register', express.urlencoded({ extended: true }), (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Faltan datos');
  }
  // simple in-memory user store (never use in production)
  users.push({ email, password });
  console.log('Nuevo usuario registrado', email);
  res.send('Registro completado');
});

app.listen(port, () => {
  console.log(`Catalog app listening on port ${port}`);
});
