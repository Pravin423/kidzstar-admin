const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
