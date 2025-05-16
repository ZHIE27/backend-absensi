const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');
const cors = require('cors');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));
app.use('/api',apiRoutes);
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});