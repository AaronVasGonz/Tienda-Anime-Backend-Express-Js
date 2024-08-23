const express = require('express');
const app = express();
const port = 3001;
const cors = require("cors");
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const {admin, bucket} = require('./config/firebaseConfig');
const {deleteFileFromFirebase} = require('./utils/actions');
app.use(express.json());
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true })); 
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000', 
  credentials: true, 
}));

// Ruta principal
app.get('/api', (req, res) => {
  res.send('¡Hola, mundo!');
});

if (admin.apps.length) {
  //console.log("Firebase admin initialized");
  if (bucket) {
    //console.log("Firebase storage initialized");
  }else{
    console.log("Firebase storage not initialized");
  }
}else{
  console.log("Firebase admin not initialized");
}

// Routers

//archivo estatico de ima
app.use('/images', express.static(path.join(__dirname, 'images')));

const routerLogin = require('./routers/login.js');
app.use('/api', routerLogin);

const routerRegistro = require('./routers/registro.js');
app.use('/api', routerRegistro);

const routerAuth = require('./routers/auth.js');
app.use('/api', routerAuth);

const routerUsersAdmin = require('./routers/Users.js');
app.use('/api', routerUsersAdmin);

const routerCollection = require('./routers/Collections.js');
app.use('/api', routerCollection);

const routerCategoriesAdmin = require('./routers/Categories.js');
app.use('/api', routerCategoriesAdmin);

const routerProducts = require('./routers/Products.js');
app.use('/api', routerProducts);

const routerProviders = require('./routers/Providers.js');
app.use('/api', routerProviders);

const routerUserDetails = require('./routers/userDetails.js');
app.use('/api', routerUserDetails);

const routerCountries = require('./routers/countries.js');
app.use('/api', routerCountries);

const routerStripe = require('./routers/stripe.js');
app.use('/api', routerStripe);

const routerContact = require('./routers/contact.js');
app.use('/api', routerContact);


//Sequelize
const sequelize = require('./config/sequelizeConfig');
const models = require('./Models/');

sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de datos sincronizada ');
  })
  .catch(error => {
    console.error('Error al sincronizar la base de datos:', error);
  });


// Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).send('Recurso no encontrado');
});


// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal');
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});