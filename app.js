const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const consign = require('consign');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config()

app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static('files'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors())


nunjucks.configure('views', {
    autoescape: true,
    express: app
});

consign({
    verbose: process.env.APP_DEBUG,
    locale: 'pt-br'
  })
  .then('controllers')
  .then('routes')
  .into(app);
    
  app.listen(process.env.APP_PORT || 3333, () => {
    console.log("Sing like no one is listening...!");
});
