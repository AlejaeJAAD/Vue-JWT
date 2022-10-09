const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');

//routes
const dashboadRoutes = require('./routes/dashboard');
const verifyToken = require('./routes/validate-token');
const welcomeRoutes = require('./routes/welcomeRoutes')

require('dotenv').config()

const app = express();

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(cors())

// Conexión a Base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@apijwt.refwaoj.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))

// import routes
const authRoutes = require('./routes/auth');

// route middlewares
app.use('/api/user', authRoutes);
app.use('/api/dashboard', verifyToken, dashboadRoutes);
app.use('/api/welcome', verifyToken, welcomeRoutes)

// route middlewares
// app.get('/', (req, res) => {
//     res.json({
//         estado: true,
//         mensaje: 'Funciona!'
//     })
// });

// cors
// const cors = require('cors');
// var corsOptions = {
//     origin: '*', // Reemplazar con dominio
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }
// app.use(cors(corsOptions));

// Middleware para Vue.js router modo history
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(__dirname + "/public"));

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en: ${PORT}`)
})